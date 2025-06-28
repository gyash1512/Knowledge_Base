import React, { useState } from 'react';

const CreateAgent = () => {
  const [agentName, setAgentName] = useState('');
  const [modelName, setModelName] = useState('gemini-2.0-flash');
  const [includeKbs, setIncludeKbs] = useState('');
  const [includeTables, setIncludeTables] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: agentName,
        model_name: modelName,
        include_knowledge_bases: includeKbs.split(',').map(s => s.trim()),
        include_tables: includeTables.split(',').map(s => s.trim()),
        prompt_template: promptTemplate,
      }),
    });
    setAgentName('');
    setModelName('gemini-2.0-flash');
    setIncludeKbs('');
    setIncludeTables('');
    setPromptTemplate('');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create Agent</h1>
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
          <label htmlFor="model_name" className="block text-lg font-medium mb-2 mt-4">Model Name:</label>
          <input
            type="text"
            id="model_name"
            name="model_name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <label htmlFor="include_kbs" className="block text-lg font-medium mb-2 mt-4">Include Knowledge Bases (comma-separated):</label>
          <input
            type="text"
            id="include_kbs"
            name="include_kbs"
            value={includeKbs}
            onChange={(e) => setIncludeKbs(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="include_tables" className="block text-lg font-medium mb-2 mt-4">Include Tables (comma-separated):</label>
          <input
            type="text"
            id="include_tables"
            name="include_tables"
            value={includeTables}
            onChange={(e) => setIncludeTables(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="prompt_template" className="block text-lg font-medium mb-2 mt-4">Prompt Template:</label>
          <textarea
            id="prompt_template"
            name="prompt_template"
            rows="3"
            value={promptTemplate}
            onChange={(e) => setPromptTemplate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., describe data"
          ></textarea>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Agent</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAgent;
