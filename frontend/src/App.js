import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import KnowledgeBaseList from './pages/KnowledgeBaseList';
import CreateKnowledgeBase from './pages/CreateKnowledgeBase';
import IngestData from './pages/IngestData';
import Query from './pages/Query';
import CreateJob from './pages/CreateJob';
import CreateAITable from './pages/CreateAITable';
import QueryAITable from './pages/QueryAITable';
import CreateWorkflow from './pages/CreateWorkflow';
import QueryWorkflow from './pages/QueryWorkflow';
import CreateAgent from './pages/CreateAgent';
import QueryAgent from './pages/QueryAgent';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kbs" element={<KnowledgeBaseList />} />
            <Route path="/create-kb" element={<CreateKnowledgeBase />} />
            <Route path="/ingest" element={<IngestData />} />
            <Route path="/query" element={<Query />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/create-ai-table" element={<CreateAITable />} />
            <Route path="/query-ai-table" element={<QueryAITable />} />
            <Route path="/create-workflow" element={<CreateWorkflow />} />
            <Route path="/query-workflow" element={<QueryWorkflow />} />
            <Route path="/create-agent" element={<CreateAgent />} />
            <Route path="/query-agent" element={<QueryAgent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
