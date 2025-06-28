import React from 'react';
import { Link } from 'react-router-dom';
import { FiDatabase, FiCpu, FiGitPullRequest, FiCode, FiAlertCircle, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

const FeatureCard = ({ to, icon, title, description }) => (
  <Link to={to} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-700 transition-all transform hover:-translate-y-1">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-indigo-500 rounded-full">
        {icon}
      </div>
      <h3 className="ml-4 text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </Link>
);

const Home = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
          MindsDB Knowledge Base Manager
        </h1>
        <p className="mt-4 text-xl text-gray-400">
          Your one-stop solution for managing and interacting with MindsDB Knowledge Bases.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Knowledge Base Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard to="/create-kb" icon={<FiDatabase size={24} />} title="Create Knowledge Base" description="Create a new vector database to store your data for semantic search." />
          <FeatureCard to="/ingest" icon={<FiDatabase size={24} />} title="Ingest Data" description="Upload a text file to add its content to a Knowledge Base." />
          <FeatureCard to="/query" icon={<FiDatabase size={24} />} title="Query Knowledge Base" description="Perform a semantic search on your Knowledge Base." />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Automation and AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard to="/create-job" icon={<FiCpu size={24} />} title="Create Job" description="Set up a recurring job to automatically ingest data from a URL." />
          <FeatureCard to="/create-ai-table" icon={<FiCpu size={24} />} title="Create AI Table" description="Create an AI Table that joins your Knowledge Base with a generative model." />
          <FeatureCard to="/query-ai-table" icon={<FiCpu size={24} />} title="Query AI Table" description="Query an AI Table with natural language questions." />
          <FeatureCard to="/create-workflow" icon={<FiCpu size={24} />} title="Create Workflow" description="Define a series of models to be applied to the results of a query." />
          <FeatureCard to="/query-workflow" icon={<FiCpu size={24} />} title="Query Workflow" description="Query a workflow with text, a file, or another knowledge base." />
          <FeatureCard to="/create-agent" icon={<FiCpu size={24} />} title="Create Agent" description="Create an agent that can use tools to answer questions." />
          <FeatureCard to="/query-agent" icon={<FiCpu size={24} />} title="Query Agent" description="Query an agent with natural language questions." />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-8">PR Reviews & Error Pinpointing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard to="/pull-request" icon={<FiGitPullRequest size={24} />} title="Pull Request Summarization" description="Automatically summarize the changes in a pull request." />
          <FeatureCard to="/code-context" icon={<FiCode size={24} />} title="Code Context Q&A" description="Ask questions about a block of code." />
          <FeatureCard to="/error-log" icon={<FiAlertCircle size={24} />} title="Error Log Reasoning" description="Get an explanation for an error log." />
          <FeatureCard to="/test-coverage" icon={<FiCheckCircle size={24} />} title="Test Coverage Gaps" description="Detect gaps in your test coverage." />
          <FeatureCard to="/diff-commenting" icon={<FiMessageSquare size={24} />} title="Diff Commenting" description="Get comments on a diff." />
        </div>
      </div>
    </div>
  );
};

export default Home;
