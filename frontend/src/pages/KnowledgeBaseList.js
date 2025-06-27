import React, { useState, useEffect } from 'react';

const KnowledgeBaseList = () => {
  const [kbs, setKbs] = useState([]);

  useEffect(() => {
    const fetchKbs = async () => {
      const response = await fetch('/api/kbs');
      const data = await response.json();
      setKbs(data);
    };
    fetchKbs();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Knowledge Bases</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul>
          {kbs.map((kb) => (
            <li key={kb} className="mb-2">{kb}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBaseList;
