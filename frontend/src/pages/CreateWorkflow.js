import React, { useState } from 'react';

const CreateWorkflow = () => {
  const [workflowName, setWorkflowName] = useState('');
  const [kbName, setKbName] = useState('');
  const [predict, setPredict] = useState('answer');
  const [promptTemplate, setPromptTemplate] = useState('{{text}}');
  const [models, setModels] = useState([{ name: '' }]);

  const handleModelChange = (index, event) => {
    const values = [...models];
    values[index][event.target.name] = event.target.value;
    setModels(values);
  };

  const handleAddModel = () => {
    setModels([...models, { name: '' }]);
  };

  const handleRemoveModel = (index) => {
    const values = [...models];
    values.splice(index, 1);
    setModels(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: workflowName,
        kb_name: kbName,
        predict: predict,
        prompt_template: promptTemplate,
        models: models.map(m => m.name),
      }),
    });
    setWorkflowName('');
    setKbName('');
    setPredict('answer');
    setPromptTemplate('{{text}}');
    setModels([{ name: '' }]);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Create Workflow</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="workflow_name" className="block text-lg font-medium text-gray-300">Workflow Name</label>
            <input
              type="text"
              id="workflow_name"
              name="workflow_name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
            />
          </div>
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
            <label htmlFor="predict" className="block text-lg font-medium text-gray-300">Predict</label>
            <input
              type="text"
              id="predict"
              name="predict"
              value={predict}
              onChange={(e) => setPredict(e.target.value)}
              required
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
              placeholder="e.g., summarize the following text: {{text}}"
            ></textarea>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Models</h2>
            {models.map((model, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  name="name"
                  value={model.name}
                  onChange={(e) => handleModelChange(index, e)}
                  className="w-full px-4 py-2 border rounded-lg mr-2 bg-gray-700 border-gray-600 text-white"
                  placeholder="Model Name"
                />
                <button type="button" onClick={() => handleRemoveModel(index)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">-</button>
              </div>
            ))}
            <button type="button" onClick={handleAddModel} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Add Model</button>
          </div>

          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Workflow
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkflow;
