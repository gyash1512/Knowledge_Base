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
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Create Agent</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="agent_name" className="block text-lg font-medium text-gray-300">Agent Name</label>
            <input
              type="text"
              id="agent_name"
              name="agent_name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="model_name" className="block text-lg font-medium text-gray-300">Model Name</label>
            <input
              type="text"
              id="model_name"
              name="model_name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="include_kbs" className="block text-lg font-medium text-gray-300">Include Knowledge Bases (comma-separated)</label>
            <input
              type="text"
              id="include_kbs"
              name="include_kbs"
              value={includeKbs}
              onChange={(e) => setIncludeKbs(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="include_tables" className="block text-lg font-medium text-gray-300">Include Tables (comma-separated)</label>
            <input
              type="text"
              id="include_tables"
              name="include_tables"
              value={includeTables}
              onChange={(e) => setIncludeTables(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="prompt_template" className="block text-lg font-medium text-gray-300">Prompt Template</label>
            <textarea
              id="prompt_template"
              name="prompt_template"
              rows="3"
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., describe data"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAgent;
