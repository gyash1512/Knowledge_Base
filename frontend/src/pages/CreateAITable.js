import React, { useState } from 'react';

const CreateAITable = () => {
  const [aiTableName, setAiTableName] = useState('');
  const [kbName, setKbName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/ai-tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ai_table_name: aiTableName,
        kb_name: kbName,
      }),
    });
    setAiTableName('');
    setKbName('');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create AI Table</h1>
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
          <label htmlFor="kb_name" className="block text-lg font-medium mb-2 mt-4">Knowledge Base Name:</label>
          <input
            type="text"
            id="kb_name"
            name="kb_name"
            value={kbName}
            onChange={(e) => setKbName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create AI Table</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAITable;
