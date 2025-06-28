import React, { useState } from 'react';

const CreateAITable = () => {
  const [aiTableName, setAiTableName] = useState('');
  const [kbName, setKbName] = useState('');
  const [modelName, setModelName] = useState('gemini-2.0-flash');
  const [predict, setPredict] = useState('specialty');
  const [engine, setEngine] = useState('google_gemini');
  const [args, setArgs] = useState([{ key: '', value: '' }]);

  const handleArgChange = (index, event) => {
    const values = [...args];
    values[index][event.target.name] = event.target.value;
    setArgs(values);
  };

  const handleAddArg = () => {
    setArgs([...args, { key: '', value: '' }]);
  };

  const handleRemoveArg = (index) => {
    const values = [...args];
    values.splice(index, 1);
    setArgs(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usingArgs = args.reduce((acc, arg) => {
      if (arg.key) {
        acc[arg.key] = arg.value;
      }
      return acc;
    }, {});

    await fetch('/api/ai-tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ai_table_name: aiTableName,
        kb_name: kbName,
        model_name: modelName,
        predict: predict,
        engine: engine,
        using: usingArgs,
      }),
    });
    setAiTableName('');
    setKbName('');
    setModelName('gemini-2.0-flash');
    setPredict('specialty');
    setEngine('google_gemini');
    setArgs([{ key: '', value: '' }]);
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
          <label htmlFor="engine" className="block text-lg font-medium mb-2 mt-4">Engine:</label>
          <input
            type="text"
            id="engine"
            name="engine"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">Arguments</h2>
          {args.map((arg, index) => (
            <div key={index} className="flex items-center mb-4">
              <select
                name="key"
                value={arg.key}
                onChange={(e) => handleArgChange(index, e)}
                className="w-1/3 px-4 py-2 border rounded-lg mr-2"
              >
                <option value="">Select Argument</option>
                <option value="assistant_column">assistant_column</option>
                <option value="mode">mode</option>
                <option value="max_tokens">max_tokens</option>
                <option value="img_url">img_url</option>
                <option value="title_column">title_column</option>
                <option value="prompt_template">prompt_template</option>
                <option value="prompt">prompt</option>
                <option value="json_struct">json_struct</option>
                <option value="user_column">user_column</option>
                <option value="api_key">api_key</option>
                <option value="context_column">context_column</option>
                <option value="ctx_column">ctx_column</option>
                <option value="model_name">model_name</option>
                <option value="temperature">temperature</option>
                <option value="type">type</option>
                <option value="question_column">question_column</option>
                <option value="predict_params">predict_params</option>
                <option value="input_text">input_text</option>
                <option value="target">target</option>
              </select>
              <input
                type="text"
                name="value"
                value={arg.value}
                onChange={(e) => handleArgChange(index, e)}
                className="w-2/3 px-4 py-2 border rounded-lg"
                placeholder="Argument Value"
              />
              <button type="button" onClick={() => handleRemoveArg(index)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">-</button>
            </div>
          ))}
          <button type="button" onClick={handleAddArg} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Add Argument</button>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create AI Table</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAITable;
