import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const QueryAgent = () => {
  const [agentName, setAgentName] = useState('');
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/agents/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: agentName,
        question: question,
      }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Query Agent</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="agent_name" className="block text-lg font-medium mb-2">Agent Name:</label>
          <input
            type="text"
            id="agent_name"
            name="agent_name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
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
          <div className="prose">
            <ReactMarkdown>{results[0][0]}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryAgent;
