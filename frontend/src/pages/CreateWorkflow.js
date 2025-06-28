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
    <div>
      <h1 className="text-4xl font-bold mb-8">Create Workflow</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="workflow_name" className="block text-lg font-medium mb-2">Workflow Name:</label>
          <input
            type="text"
            id="workflow_name"
            name="workflow_name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
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
          <label htmlFor="predict" className="block text-lg font-medium mb-2 mt-4">Predict:</label>
          <input
            type="text"
            id="predict"
            name="predict"
            value={predict}
            onChange={(e) => setPredict(e.target.value)}
            required
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
            placeholder="e.g., summarize the following text: {{text}}"
          ></textarea>

          <h2 className="text-2xl font-bold mt-8 mb-4">Models</h2>
          {models.map((model, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                name="name"
                value={model.name}
                onChange={(e) => handleModelChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg mr-2"
                placeholder="Model Name"
              />
              <button type="button" onClick={() => handleRemoveModel(index)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">-</button>
            </div>
          ))}
          <button type="button" onClick={handleAddModel} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Add Model</button>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Workflow</button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkflow;
