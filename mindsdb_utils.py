import os
import requests
from dotenv import load_dotenv

load_dotenv()

MINDSDB_API_URL = f"{os.environ.get('MINDSDB_HOST')}:{os.environ.get('MINDSDB_TCP_PORT')}/api"
MINDSDB_USER = os.environ.get("MINDSDB_USER")
MINDSDB_PASSWORD = os.environ.get("MINDSDB_PASSWORD")

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
