import React, { useState } from 'react';

const Query = () => {
  const [kbName, setKbName] = useState('');
  const [query, setQuery] = useState('');
  const [metadataFilter, setMetadataFilter] = useState('');
  const [results, setResults] = useState([]);

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
    <div>
      <h1 className="text-4xl font-bold mb-8">Query Knowledge Base</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="kb_name" className="block text-lg font-medium mb-2">Knowledge Base Name:</label>
          <input
            type="text"
            id="kb_name"
            name="kb_name"
            value={kbName}
            onChange={(e) => setKbName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="query" className="block text-lg font-medium mb-2 mt-4">Query:</label>
          <input
            type="text"
            id="query"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., what are the main features?"
          />
          <label htmlFor="metadata_filter" className="block text-lg font-medium mb-2 mt-4">Metadata Filter (SQL WHERE clause format):</label>
          <input
            type="text"
            id="metadata_filter"
            name="metadata_filter"
            value={metadataFilter}
            onChange={(e) => setMetadataFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., author = 'John Doe'"
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Query</button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="mb-2">{JSON.stringify(result)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Query;
