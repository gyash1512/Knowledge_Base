import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">MindsDB Knowledge Base Manager</h1>
      <p className="text-lg mb-8">This application allows you to create, manage, and query your MindsDB Knowledge Bases.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Knowledge Base Operations</h2>
          <ul>
            <li className="mb-2"><Link to="/create-kb" className="text-blue-600 hover:underline">Create a New Knowledge Base</Link></li>
            <li className="mb-2"><Link to="/ingest" className="text-blue-600 hover:underline">Ingest Data into a Knowledge Base</Link></li>
            <li className="mb-2"><Link to="/query" className="text-blue-600 hover:underline">Query a Knowledge Base</Link></li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Automation and AI</h2>
          <ul>
            <li className="mb-2"><Link to="/create-job" className="text-blue-600 hover:underline">Create a Job for Automated Ingestion</Link></li>
            <li className="mb-2"><Link to="/create-ai-table" className="text-blue-600 hover:underline">Create an AI Table</Link></li>
            <li className="mb-2"><Link to="/query-ai-table" className="text-blue-600 hover:underline">Query an AI Table</Link></li>
            <li className="mb-2"><Link to="/create-workflow" className="text-blue-600 hover:underline">Create a Workflow</Link></li>
            <li className="mb-2"><Link to="/query-workflow" className="text-blue-600 hover:underline">Query a Workflow</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
