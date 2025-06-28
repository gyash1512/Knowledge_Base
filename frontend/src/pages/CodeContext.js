import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const CodeContext = () => {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/code-context/qa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context, question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Code Context Q&A</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="context" className="block text-lg font-medium text-gray-300">Code Context</label>
            <textarea
              id="context"
              name="context"
              rows="10"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            ></textarea>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="question" className="block text-lg font-medium text-gray-300">Question</label>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ask
          </button>
        </form>
      </div>
      {answer && (
        <div className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Answer</h2>
          <div className="prose prose-invert">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeContext;
