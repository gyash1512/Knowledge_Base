import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Query = () => {
  const [kbName, setKbName] = useState('');
  const [query, setQuery] = useState('');
  const [metadataFilter, setMetadataFilter] = useState('');
  const [results, setResults] = useState([]);

  const sendToAITable = async () => {
    const response = await fetch('/api/ai-tables/workflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        results: results,
      }),
    });
    const data = await response.json();
    alert(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kb_name: kbName,
        query: query,
        metadata_filter: metadataFilter,
      }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Query Knowledge Base</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="kb_name" className="block text-lg font-medium text-gray-300">Knowledge Base Name</label>
            <input
              type="text"
              id="kb_name"
              name="kb_name"
              value={kbName}
              onChange={(e) => setKbName(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="query" className="block text-lg font-medium text-gray-300">Query</label>
            <input
              type="text"
              id="query"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., what are the main features?"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="metadata_filter" className="block text-lg font-medium text-gray-300">Metadata Filter (SQL WHERE clause format)</label>
            <input
              type="text"
              id="metadata_filter"
              name="metadata_filter"
              value={metadataFilter}
              onChange={(e) => setMetadataFilter(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., author = 'John Doe'"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Query
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <ReactMarkdown className="prose prose-invert">{`**ID:** ${result[0]}\n\n**Content:** ${result[2]}\n\n**Metadata:** ${result[3]}`}</ReactMarkdown>
              </div>
            ))}
          </div>
          <button onClick={sendToAITable} className="w-full mt-4 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Send to AI Table
          </button>
        </div>
      )}
    </div>
  );
};

export default Query;
