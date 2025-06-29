import React, { useState } from 'react';

const IngestRepo = () => {
  const [kbName, setKbName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/ingest-repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kb_name: kbName,
        repo_url: repoUrl,
      }),
    });
    setKbName('');
    setRepoUrl('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Ingest GitHub Repository</h1>
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
            <label htmlFor="repo_url" className="block text-lg font-medium text-gray-300">Repository URL</label>
            <input
              type="text"
              id="repo_url"
              name="repo_url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ingest Repository
          </button>
        </form>
      </div>
    </div>
  );
};

export default IngestRepo;
