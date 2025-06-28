import React, { useState } from 'react';

const CreateKnowledgeBase = () => {
  const [kbName, setKbName] = useState('');
  const [embeddingProvider, setEmbeddingProvider] = useState('vertex_ai');
  const [embeddingModel, setEmbeddingModel] = useState('gemini-embedding-001');
  const [rerankingProvider, setRerankingProvider] = useState('gemini');
  const [rerankingModel, setRerankingModel] = useState('gemini-2.0-flash');
  const [metadataColumns, setMetadataColumns] = useState('');
  const [contentColumns, setContentColumns] = useState('');
  const [idColumn, setIdColumn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/kbs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: kbName,
        embedding_model: {
          provider: embeddingProvider,
          model_name: embeddingModel,
        },
        reranking_model: {
          provider: rerankingProvider,
          model_name: rerankingModel,
        },
        metadata_columns: metadataColumns.split(',').map(s => s.trim()),
        content_columns: contentColumns.split(',').map(s => s.trim()),
        id_column: idColumn,
      }),
    });
    setKbName('');
    setEmbeddingProvider('vertex_ai');
    setEmbeddingModel('gemini-embedding-001');
    setRerankingProvider('gemini');
    setRerankingModel('gemini-2.0-flash');
    setMetadataColumns('');
    setContentColumns('');
    setIdColumn('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Create Knowledge Base</h1>
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
              placeholder="e.g., my_document_kb"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Embedding Model</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="embedding_provider" className="block text-lg font-medium text-gray-300">Provider</label>
                  <input
                    type="text"
                    id="embedding_provider"
                    value={embeddingProvider}
                    onChange={(e) => setEmbeddingProvider(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                  />
                </div>
                <div>
                  <label htmlFor="embedding_model" className="block text-lg font-medium text-gray-300">Model Name</label>
                  <input
                    type="text"
                    id="embedding_model"
                    value={embeddingModel}
                    onChange={(e) => setEmbeddingModel(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Reranking Model</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="reranking_provider" className="block text-lg font-medium text-gray-300">Provider</label>
                  <input
                    type="text"
                    id="reranking_provider"
                    value={rerankingProvider}
                    onChange={(e) => setRerankingProvider(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                  />
                </div>
                <div>
                  <label htmlFor="reranking_model" className="block text-lg font-medium text-gray-300">Model Name</label>
                  <input
                    type="text"
                    id="reranking_model"
                    value={rerankingModel}
                    onChange={(e) => setRerankingModel(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Columns</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="metadata_columns" className="block text-lg font-medium text-gray-300">Metadata Columns (comma-separated)</label>
                <input
                  type="text"
                  id="metadata_columns"
                  value={metadataColumns}
                  onChange={(e) => setMetadataColumns(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                />
              </div>
              <div>
                <label htmlFor="content_columns" className="block text-lg font-medium text-gray-300">Content Columns (comma-separated)</label>
                <input
                  type="text"
                  id="content_columns"
                  value={contentColumns}
                  onChange={(e) => setContentColumns(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                />
              </div>
              <div>
                <label htmlFor="id_column" className="block text-lg font-medium text-gray-300">ID Column</label>
                <input
                  type="text"
                  id="id_column"
                  value={idColumn}
                  onChange={(e) => setIdColumn(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Knowledge Base
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateKnowledgeBase;
