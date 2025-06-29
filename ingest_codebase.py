import os
import json
import sys
from langchain.text_splitter import RecursiveCharacterTextSplitter, Language
from unstructured.partition.auto import partition
import git
from mindsdb_utils import query_mindsdb

KB_ID_COLUMN = 'chunk_id'
KB_CONTENT_COLUMN = 'chunk_content'
KB_METADATA_COLUMNS = ['file_path', 'language', 'start_line', 'end_line']

INCLUDE_EXTENSIONS = (
    '.py', '.js', '.ts', '.java', '.c', '.cpp', '.h', '.hpp',
    '.cs', '.go', '.rs', '.rb', '.php', '.swift', '.kt', '.sh',
    '.md', '.txt', '.json', '.xml', '.yaml', '.yml', '.html', '.css',
    '.sql', '.hs'
)
EXCLUDE_DIRS = (
    '.git', '__pycache__', 'node_modules', 'venv', 'env', 'build',
    'dist', '.vscode', '.idea', 'target', '.ipynb_checkpoints', 'mindsdb'
)

def create_knowledge_base(kb_name):
    print(f"Dropping existing Knowledge Base '{kb_name}' if it exists...")
    drop_result = query_mindsdb(f"DROP KNOWLEDGE_BASE IF EXISTS {kb_name};")
    if drop_result and 'error_message' in drop_result:
        print(f"Warning: Error dropping KB (may not exist): {drop_result.get('error_message', drop_result)}")
    else:
        print("Knowledge Base dropped (if it existed).")

    embedding_model_params = {
        "provider": "vertex_ai",
        "model_name": "gemini-embedding-001",
        "max_batch_size": 1,
        "engine": "google_embedding_engine"
    }
    
    reranking_model_params = {
        "provider": "gemini",
        "model_name": "gemini-2.0-flash"
    }

    kb_query = f"""
    CREATE KNOWLEDGE_BASE {kb_name}
    USING
        embedding_model = {json.dumps(embedding_model_params)},
        reranking_model = {json.dumps(reranking_model_params)},
        metadata_columns = {json.dumps(KB_METADATA_COLUMNS)},
        content_columns = ['{KB_CONTENT_COLUMN}'],
        id_column = '{KB_ID_COLUMN}';
    """
    print(f"\nCreating Knowledge Base '{kb_name}' with query:\n{kb_query}")
    result = query_mindsdb(kb_query)
    if not result or 'error_message' in result:
        print(f"Error creating Knowledge Base: {result.get('error_message', result)}")
        exit()
    else:
        print(f"Knowledge Base '{kb_name}' created successfully.")


def get_text_splitter(file_extension):
    """Returns a suitable text splitter based on file extension."""
    if file_extension == '.py':
        return RecursiveCharacterTextSplitter.from_language(Language.PYTHON, chunk_size=1000, chunk_overlap=100)
    elif file_extension in ['.js', '.ts']:
        return RecursiveCharacterTextSplitter.from_language(Language.JS, chunk_size=1000, chunk_overlap=100)
    elif file_extension in ['.md', '.txt', '.json', '.xml', '.yaml', '.yml', '.html', '.css', '.sql', '.hs']:
        return RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    else:
        return RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)

def ingest_codebase(kb_name, path):
    print(f"\nStarting ingestion from: {path}")
    chunks_to_ingest = []
    chunk_counter = 0

    for root, dirs, files in os.walk(path, topdown=True):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        for file_name in files:
            file_extension = os.path.splitext(file_name)[1].lower()
            if file_extension not in INCLUDE_EXTENSIONS:
                continue

            file_path = os.path.join(root, file_name)
            relative_file_path = os.path.relpath(file_path, path)

            print(f"Processing: {relative_file_path}")

            try:
                elements = partition(filename=file_path)
                file_content = "\n".join([str(el) for el in elements])

                if not file_content.strip():
                    print(f"  Skipping empty file: {relative_file_path}")
                    continue

                text_splitter = get_text_splitter(file_extension)
                chunks = text_splitter.split_text(file_content)

                for i, chunk in enumerate(chunks):
                    chunk_counter += 1
                    metadata = {
                        'file_path': relative_file_path,
                        'language': file_extension.lstrip('.'),
                        'start_line': 0,
                        'end_line': 0
                    }
                    
                    chunks_to_ingest.append({
                        KB_ID_COLUMN: f"{relative_file_path}-{i}",
                        KB_CONTENT_COLUMN: chunk,
                        **metadata
                    })

                    insert_chunks_to_mindsdb(kb_name, [chunks_to_ingest[-1]])
                    chunks_to_ingest = []

            except Exception as e:
                print(f"  Error processing file {relative_file_path}: {e}", file=sys.stderr)

    print(f"\nIngestion complete. Total chunks processed: {chunk_counter}")

def insert_chunks_to_mindsdb(kb_name, chunks_data):
    """Inserts a batch of chunks into the MindsDB Knowledge Base."""
    if not chunks_data:
        return

    chunk_dict = chunks_data[0]

    columns = [KB_ID_COLUMN, KB_CONTENT_COLUMN] + KB_METADATA_COLUMNS
    column_list = ", ".join(columns)

    row_values = []
    for col in columns:
        val = chunk_dict.get(col)
        if isinstance(val, str):
            val_escaped = val.replace("'", "''").replace('\n', ' ').replace('\r', '')
            row_values.append(f"'{val_escaped}'")
        elif val is None:
            row_values.append("NULL")
        else:
            row_values.append(str(val))

    insert_query = f"""
    INSERT INTO {kb_name} ({column_list})
    VALUES ({', '.join(row_values)});
    """

    print(f"Inserting 1 chunk (ID: {chunk_dict.get(KB_ID_COLUMN)}) into MindsDB...")
    try:
        result = query_mindsdb(insert_query)
        if not result or 'error_message' in result:
            print(f"  Error inserting chunk {chunk_dict.get(KB_ID_COLUMN)}: {result.get('error_message', result)}", file=sys.stderr)
        else:
            print(f"  Successfully inserted chunk {chunk_dict.get(KB_ID_COLUMN)}.")
    except Exception as e:
        print(f"  Exception during insert for chunk {chunk_dict.get(KB_ID_COLUMN)}: {e}", file=sys.stderr)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ingest_codebase.py <kb_name> <repo_url>")
        exit()

    kb_name = sys.argv[1]
    repo_url = sys.argv[2]

    create_knowledge_base(kb_name)

    repo_name = repo_url.split('/')[-1].replace('.git', '')
    repo_path = os.path.join('/tmp', repo_name) # Using os.path.join for cross-OS compatibility
    if os.path.exists(repo_path):
        print(f"Removing existing repo clone at {repo_path}")
        import shutil
        shutil.rmtree(repo_path)
    
    print(f"Cloning repo from {repo_url} to {repo_path}")
    try:
        git.Repo.clone_from(repo_url, repo_path)
        print("Repo cloned successfully.")
    except git.GitCommandError as e:
        print(f"Error cloning repository: {e}", file=sys.stderr)
        sys.exit(1)


    ingest_codebase(kb_name, repo_path)

    print(f"\nCheck MindsDB: SELECT COUNT(*) FROM {kb_name};")
