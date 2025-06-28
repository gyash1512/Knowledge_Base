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
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Query Workflow</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="workflow_name" className="block text-lg font-medium text-gray-300">Workflow Name</label>
            <input
              type="text"
              id="workflow_name"
              name="workflow_name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>

          <div className="p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Query Source</h2>
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
              <label htmlFor="text" className="text-lg font-medium text-gray-300">Text</label>
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
              <label htmlFor="file" className="text-lg font-medium text-gray-300">File</label>
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
              <label htmlFor="kb" className="text-lg font-medium text-gray-300">Knowledge Base</label>
            </div>
          </div>

          {querySource === 'text' && (
            <div className="p-4 bg-gray-900 rounded-lg">
              <label htmlFor="query_text" className="block text-lg font-medium text-gray-300">Query Text</label>
              <textarea
                id="query_text"
                name="query_text"
                rows="3"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              ></textarea>
            </div>
          )}

          {querySource === 'file' && (
            <div className="p-4 bg-gray-900 rounded-lg">
              <label htmlFor="query_file" className="block text-lg font-medium text-gray-300">Query File</label>
              <input
                type="file"
                id="query_file"
                name="query_file"
                onChange={(e) => setQueryFile(e.target.files[0])}
                className="mt-1 block w-full text-gray-300"
              />
            </div>
          )}

          {querySource === 'kb' && (
            <div className="p-4 bg-gray-900 rounded-lg">
              <label htmlFor="query_kb" className="block text-lg font-medium text-gray-300">Knowledge Base Name</label>
              <input
                type="text"
                id="query_kb"
                name="query_kb"
                value={queryKb}
                onChange={(e) => setQueryKb(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              />
            </div>
          )}

          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Query Workflow
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
          <div className="prose prose-invert">
            <ReactMarkdown>{results[0]}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryWorkflow;
