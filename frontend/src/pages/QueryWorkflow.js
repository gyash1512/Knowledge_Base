import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const QueryWorkflow = () => {
  const [workflowName, setWorkflowName] = useState('');
  const [querySource, setQuerySource] = useState('text');
  const [queryText, setQueryText] = useState('');
  const [queryFile, setQueryFile] = useState(null);
  const [queryKb, setQueryKb] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('workflow_name', workflowName);
    formData.append('query_source', querySource);
    if (querySource === 'text') {
      formData.append('query_text', queryText);
    } else if (querySource === 'file') {
      formData.append('query_file', queryFile);
    } else if (querySource === 'kb') {
      formData.append('query_kb', queryKb);
    }

    const response = await fetch('/api/workflows/query', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Query Workflow</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="workflow_name" className="block text-lg font-medium mb-2">Workflow Name:</label>
          <input
            type="text"
            id="workflow_name"
            name="workflow_name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">Query Source</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="text"
              name="query_source"
              value="text"
              checked={querySource === 'text'}
              onChange={(e) => setQuerySource(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="text">Text</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="file"
              name="query_source"
              value="file"
              checked={querySource === 'file'}
              onChange={(e) => setQuerySource(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="file">File</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="kb"
              name="query_source"
              value="kb"
              checked={querySource === 'kb'}
              onChange={(e) => setQuerySource(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="kb">Knowledge Base</label>
          </div>

          {querySource === 'text' && (
            <div>
              <label htmlFor="query_text" className="block text-lg font-medium mb-2">Query Text:</label>
              <textarea
                id="query_text"
                name="query_text"
                rows="3"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>
          )}

          {querySource === 'file' && (
            <div>
              <label htmlFor="query_file" className="block text-lg font-medium mb-2">Query File:</label>
              <input
                type="file"
                id="query_file"
                name="query_file"
                onChange={(e) => setQueryFile(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {querySource === 'kb' && (
            <div>
              <label htmlFor="query_kb" className="block text-lg font-medium mb-2">Knowledge Base Name:</label>
              <input
                type="text"
                id="query_kb"
                name="query_kb"
                value={queryKb}
                onChange={(e) => setQueryKb(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Query Workflow</button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="prose">
            <ReactMarkdown>{results[0]}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryWorkflow;
