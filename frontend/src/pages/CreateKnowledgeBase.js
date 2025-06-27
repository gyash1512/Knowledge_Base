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
    <div>
      <h1 className="text-4xl font-bold mb-8">Create Knowledge Base</h1>
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
            placeholder="e.g., my_document_kb"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">Embedding Model</h2>
          <label htmlFor="embedding_provider" className="block text-lg font-medium mb-2">Provider:</label>
          <input
            type="text"
            id="embedding_provider"
            value={embeddingProvider}
            onChange={(e) => setEmbeddingProvider(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="embedding_model" className="block text-lg font-medium mb-2 mt-4">Model Name:</label>
          <input
            type="text"
            id="embedding_model"
            value={embeddingModel}
            onChange={(e) => setEmbeddingModel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">Reranking Model</h2>
          <label htmlFor="reranking_provider" className="block text-lg font-medium mb-2">Provider:</label>
          <input
            type="text"
            id="reranking_provider"
            value={rerankingProvider}
            onChange={(e) => setRerankingProvider(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="reranking_model" className="block text-lg font-medium mb-2 mt-4">Model Name:</label>
          <input
            type="text"
            id="reranking_model"
            value={rerankingModel}
            onChange={(e) => setRerankingModel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">Columns</h2>
          <label htmlFor="metadata_columns" className="block text-lg font-medium mb-2">Metadata Columns (comma-separated):</label>
          <input
            type="text"
            id="metadata_columns"
            value={metadataColumns}
            onChange={(e) => setMetadataColumns(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="content_columns" className="block text-lg font-medium mb-2 mt-4">Content Columns (comma-separated):</label>
          <input
            type="text"
            id="content_columns"
            value={contentColumns}
            onChange={(e) => setContentColumns(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="id_column" className="block text-lg font-medium mb-2 mt-4">ID Column:</label>
          <input
            type="text"
            id="id_column"
            value={idColumn}
            onChange={(e) => setIdColumn(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button type="submit" className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Knowledge Base</button>
        </form>
      </div>
    </div>
  );
};

export default CreateKnowledgeBase;
