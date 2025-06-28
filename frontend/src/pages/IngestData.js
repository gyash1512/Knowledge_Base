import React, { useState } from 'react';

const IngestData = () => {
  const [kbName, setKbName] = useState('');
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('kb_name', kbName);
    formData.append('file', file);
    formData.append('metadata', metadata);

    await fetch('/api/ingest', {
      method: 'POST',
      body: formData,
    });

    setKbName('');
    setFile(null);
    setMetadata('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Ingest Data</h1>
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
            <label htmlFor="file" className="block text-lg font-medium text-gray-300">File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="mt-1 block w-full text-gray-300"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="metadata" className="block text-lg font-medium text-gray-300">Metadata (JSON format)</label>
            <textarea
              id="metadata"
              name="metadata"
              rows="3"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder='e.g., {"source": "document.txt", "author": "John Doe"}'
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ingest Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default IngestData;
