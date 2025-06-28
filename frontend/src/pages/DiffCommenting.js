import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const DiffCommenting = () => {
  const [diff, setDiff] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/diff/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diff }),
    });
    const data = await response.json();
    setComments(data.comments);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Diff Commenting</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="diff" className="block text-lg font-medium text-gray-300">Diff</label>
            <textarea
              id="diff"
              name="diff"
              rows="10"
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Get Comments
          </button>
        </form>
      </div>
      {comments && (
        <div className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Comments</h2>
          <div className="prose prose-invert">
            <ReactMarkdown>{comments}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffCommenting;
