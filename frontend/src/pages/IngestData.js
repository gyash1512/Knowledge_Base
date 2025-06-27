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
    <div>
      <h1 className="text-4xl font-bold mb-8">Ingest Data</h1>
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
          <label htmlFor="file" className="block text-lg font-medium mb-2 mt-4">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="metadata" className="block text-lg font-medium mb-2 mt-4">Metadata (JSON format):</label>
          <textarea
            id="metadata"
            name="metadata"
            rows="3"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder='e.g., {"source": "document.txt", "author": "John Doe"}'
          ></textarea>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Ingest</button>
        </form>
      </div>
    </div>
  );
};

export default IngestData;
