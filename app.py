import os
import requests
import json
import pandas as pd
from io import StringIO
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

MINDSDB_API_URL = f"{os.environ.get('MINDSDB_HOST')}:{os.environ.get('MINDSDB_TCP_PORT')}/api"
MINDSDB_USER = os.environ.get("MINDSDB_USER")
MINDSDB_PASSWORD = os.environ.get("MINDSDB_PASSWORD")
FLASK_PORT = os.environ.get("FLASK_PORT")

def query_mindsdb(query):
    headers = {"Content-Type": "application/json"}
    auth = (MINDSDB_USER, MINDSDB_PASSWORD)
    data = {"query": query}
    try:
        response = requests.post(f"{MINDSDB_API_URL}/sql/query", headers=headers, auth=auth, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error querying MindsDB: {e}")
        if e.response:
            print(e.response.text)
        return None

@app.route('/api/kbs', methods=['GET', 'POST'])
def handle_kbs():
    if request.method == 'POST':
        data = request.json
        kb_name = data['name']
        embedding_model = data['embedding_model']
        reranking_model = data['reranking_model']
        metadata_columns = data['metadata_columns']
        content_columns = data['content_columns']
        id_column = data['id_column']

        query = f"""
        CREATE KNOWLEDGE_BASE {kb_name}
        USING
            embedding_model = {json.dumps(embedding_model)},
            reranking_model = {json.dumps(reranking_model)},
            metadata_columns = {json.dumps(metadata_columns)},
            content_columns = {json.dumps(content_columns)},
            id_column = '{id_column}';
        """
        result = query_mindsdb(query)
        if result:
            return jsonify({"success": True, "data": result})
        else:
            return jsonify({"success": False, "error": "Failed to create Knowledge Base"}), 500
    else:
        query = "SHOW KNOWLEDGE_BASES"
        result = query_mindsdb(query)
        if result:
            kbs = [row[0] for row in result.get('data', [])]
            return jsonify(kbs)
        else:
            return jsonify([])

@app.route('/api/ingest', methods=['POST'])
def ingest():
    kb_name = request.form['kb_name']
    file = request.files['file']
    content = file.read().decode('utf-8')
    
    data = pd.read_csv(StringIO(content))
    
    columns = ", ".join(data.columns)
    
    for index, row in data.iterrows():
        values = ", ".join([f"'{str(row[col]).replace("'", "''")}'" if isinstance(row[col], str) else str(row[col]) for col in data.columns])
        query = f"INSERT INTO {kb_name} ({columns}) VALUES ({values})"
        result = query_mindsdb(query)
        if not result or 'error_message' in result:
            return jsonify({"success": False, "error": "Failed to ingest data"}), 500
            
    return jsonify({"success": True, "data": "Data ingested successfully"})

@app.route('/api/query', methods=['POST'])
def query():
    kb_name = request.json['kb_name']
    query_str = request.json['query']
    metadata_filter = request.json.get('metadata_filter')
    
    where_clauses = []
    if query_str:
        where_clauses.append(f" chunk_content like '{query_str}'")
    if metadata_filter:
        where_clauses.append(metadata_filter)
    
    where_clause = ""
    if where_clauses:
        where_clause = "WHERE " + " AND ".join(where_clauses)

    query = f"SELECT * FROM {kb_name} {where_clause};"
    results = query_mindsdb(query)
    if results and 'data' in results:
        return jsonify(results['data'])
    else:
        return jsonify([])


@app.route('/api/jobs', methods=['POST'])
def create_job():
    job_name = request.json['job_name']
    kb_name = request.json['kb_name']
    source = request.json['source']
    schedule = request.json.get('schedule')
    repeat = request.json['repeat']
    
    query = f"""
    CREATE JOB {job_name} AS (
        INSERT INTO {kb_name}
        SELECT * FROM files.file_url('{source}')
    )
    """
    
    if schedule:
        query += f" START '{schedule}'"
        
    if repeat:
        # a more robust solution would parse the schedule string
        if "h" in repeat:
            repeat = repeat.replace("h", " hour")
        elif "d" in repeat:
            repeat = repeat.replace("d", " day")
        elif "m" in repeat:
            repeat = repeat.replace("m", " minute")
            
        query += f" EVERY '{repeat}'"
        
    result = query_mindsdb(query)
    if result:
        return jsonify({"success": True, "data": result})
    else:
        return jsonify({"success": False, "error": "Failed to create job"}), 500

@app.route('/api/ai-tables', methods=['POST'])
def create_ai_table():
    ai_table_name = request.json['ai_table_name']
    model_name = request.json['model_name']
    predict = request.json['predict']
    engine = request.json.get('engine', 'google_gemini')
    using_args = request.json.get('using', {})
    
    using_clause = ""
    if using_args:
        for key, value in using_args.items():
            using_clause += f"            {key} = '{value}',\n"
    
    query = f"""
    CREATE MODEL {ai_table_name}
    PREDICT {predict}
    USING
      engine = '{engine}',
      model_name = '{model_name}',
      {using_clause.rstrip(',\n')};
    """
    
    result = query_mindsdb(query)
    if result:
        return jsonify({"success": True, "data": result})
    else:
        return jsonify({"success": False, "error": "Failed to create AI table"}), 500

@app.route('/api/ai-tables/query', methods=['POST'])
def query_ai_table():
    ai_table_name = request.json['ai_table_name']
    question = request.json['question']
    
    query = f"SELECT answer FROM {ai_table_name} WHERE question = '{question}'"
    result = query_mindsdb(query)
    if result and 'data' in result:
        return jsonify(result['data'])
    else:
        return jsonify([])

@app.route('/api/workflows', methods=['POST'])
def create_workflow():
    workflow_name = request.json['name']
    models = request.json['models']
    kb_name = request.json['kb_name']
    predict = request.json['predict']
    prompt_template = request.json.get('prompt_template', '{{text}}')
    
    # Create the first AI table in the workflow
    query = f"""
    CREATE MODEL {workflow_name}_step_1
    PREDICT {predict}
    USING
        engine = 'google_gemini',
        model_name = '{models[0]}',
        prompt_template = '{prompt_template}',
        api_key = '{os.environ.get("GOOGLE_API_KEY")}'
    """
    result = query_mindsdb(query)
    if not result or 'error_message' in result:
        return jsonify({"success": False, "error": "Failed to create workflow"}), 500
        
    # Create the subsequent AI tables in the workflow
    for i in range(1, len(models)):
        query = f"""
        CREATE MODEL {workflow_name}_step_{i+1}
        PREDICT {predict}
        USING
            engine = 'google_gemini',
            model_name = '{models[i]}',
            prompt_template = '{{text}}',
            api_key = '{os.environ.get("GOOGLE_API_KEY")}'
        """
        result = query_mindsdb(query)
        if not result or 'error_message' in result:
            return jsonify({"success": False, "error": "Failed to create workflow"}), 500
            
    return jsonify({"success": True, "data": f"Workflow '{workflow_name}' created successfully"})

@app.route('/api/workflows/query', methods=['POST'])
def query_workflow():
    workflow_name = request.form['workflow_name']
    query_source = request.form['query_source']
    
    if query_source == 'text':
        query_text = request.form['query_text']
    elif query_source == 'file':
        file = request.files['query_file']
        query_text = file.read().decode('utf-8')
    elif query_source == 'kb':
        kb_name = request.form['query_kb']
        query = f"SELECT * FROM {kb_name}"
        results = query_mindsdb(query)
        if not results or 'data' not in results:
            return jsonify({"success": False, "error": "Failed to query knowledge base"}), 500
        query_text = " ".join([row[2] for row in results['data']])
        
    # Execute the workflow
    current_text = query_text
    i = 1
    while True:
        model_name = f"{workflow_name}_step_{i}"
        query = f"SELECT answer FROM {model_name} WHERE text = '{current_text}'"
        result = query_mindsdb(query)
        if not result or 'error_message' in result:
            break
        current_text = result['data'][0][0]
        i += 1
        
    return jsonify([current_text])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/kbs')
def kbs():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/create-kb')
def create_kb_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/ingest')
def ingest_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/query')
def query_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/create-job')
def create_job_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/create-ai-table')
def create_ai_table_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/query-workflow')
def query_workflow_page():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=FLASK_PORT)
