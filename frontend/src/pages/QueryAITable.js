import React, { useState } from 'react';

const QueryAITable = () => {
  const [aiTableName, setAiTableName] = useState('');
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/ai-tables/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ai_table_name: aiTableName,
        question: question,
      }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Query AI Table</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="ai_table_name" className="block text-lg font-medium mb-2">AI Table Name:</label>
          <input
            type="text"
            id="ai_table_name"
            name="ai_table_name"
            value={aiTableName}
            onChange={(e) => setAiTableName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="question" className="block text-lg font-medium mb-2 mt-4">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., What is the price of the gaming laptop?"
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Ask</button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Answer</h2>
          <p>{results[0]}</p>
        </div>
      )}
    </div>
  );
};

export default QueryAITable;
