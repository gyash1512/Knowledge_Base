# MindsDB Knowledge Base Manager

This is a web application for creating, managing, and querying MindsDB Knowledge Bases. It provides a user-friendly interface for stress-testing the new MindsDB Knowledge Base release.

## Features

*   **Create Knowledge Base:** Create new knowledge bases directly from the web interface.
*   **Ingest Data:** Upload text files to populate your knowledge bases.
*   **Metadata Support:** Add metadata to your data during ingestion.
*   **Semantic Search:** Perform semantic searches on your knowledge bases.
*   **Metadata Filtering:** Filter your search results based on metadata.
*   **Automated Jobs:** Create jobs to periodically update your knowledge bases from a given source.
*   **AI Table Integration:** Create AI tables that leverage your knowledge bases to generate insights.

## Prerequisites

*   [Docker](https://www.docker.com/get-started)
*   [Python 3](https://www.python.org/downloads/)
*   [Node.js and npm](https://nodejs.org/en/download/)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gyash1512/knowledge-base-app.git
    cd knowledge-base-app
    ```

2.  **Create a virtual environment and install Python dependencies:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Create a `.env` file** in the root of the project and add your MindsDB credentials and other configurations:
    ```
    MINDSDB_USER=your-mindsdb-email
    MINDSDB_PASSWORD=your-mindsdb-password
    MINDSDB_TCP_PORT=47334
    MINDSDB_HTTP_PORT=47335
    FLASK_PORT=5000
    MINDSDB_HOST=http://127.0.0.1
    ```
    You can create a free MindsDB account at [https://mindsdb.com/](https://mindsdb.com/).

5.  **Set up Google Application Credentials:**
    If you are using a Google-based model like `gemini`, you will need to provide Google Application Credentials.
    
    a. **Install the Google Cloud CLI:** Follow the instructions at [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install) to install the `gcloud` CLI.
    
    b. **Log in to your Google Cloud account:**
    ```bash
    gcloud auth login
    ```
    
    c. **Create application default credentials:**
    ```bash
    gcloud auth application-default login
    ```
    This will create a JSON file in your home directory (e.g., `~/.config/gcloud/application_default_credentials.json`).
    
    d. **Update the `docker-compose.yml` file** to mount this file into the MindsDB container. Replace `~/.config/gcloud/application_default_credentials.json` with the actual path to your credentials file.

## Running the Application

1.  **Start the MindsDB Docker container:**
    ```bash
    docker-compose up -d
    ```

2.  **Build the React application:**
    ```bash
    cd frontend
    npm run build
    cd ..
    ```

3.  **Start the Flask server:**
    ```bash
    python app.py
    ```

4.  **Access the application** by navigating to `http://127.0.0.1:5000` in your web browser.

## How to Use the Application

The application is divided into several sections, each corresponding to a specific feature.

### Home

The home page serves as a dashboard with links to all the available features.

### Knowledge Bases

This page displays a list of all your existing knowledge bases.

### Create Knowledge Base

To create a new knowledge base, simply enter a name for it and click the "Create" button.

### Ingest Data

To ingest data into a knowledge base, you need to provide the name of the knowledge base, select a text file to upload, and optionally add metadata in JSON format.

### Query

To query a knowledge base, you can provide a search query, a metadata filter, or both.

*   **Search Query:** This performs a semantic search on the `content` column of your knowledge base. For example, you could search for `"gaming laptop"`.
*   **Metadata Filter:** This allows you to filter the results based on the metadata you provided during ingestion. The filter should be in a SQL `WHERE` clause format. For example, to find all documents with the product "Laptop", you would enter `product = 'Laptop'`.
*   **Combined Query:** You can combine a search query and a metadata filter to perform a more specific search. For example, to find all gaming laptops, you could use the search query `"gaming laptop"` and the metadata filter `product = 'Laptop'`.

### Create Job

To create a job, you need to provide a name for the job, the name of the knowledge base to ingest data into, a source URL for the data, and a schedule for the job to run.

### Create AI Table

To create an AI table, you need to provide a name for the table and the name of the knowledge base to use as a source.

## Project Structure

```
.
├── app.py                  # Flask backend
├── docker-compose.yml      # Docker Compose configuration
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # React pages
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── README.md               # This file
└── requirements.txt        # Python dependencies
