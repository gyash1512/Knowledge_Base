import React, { useState } from 'react';

const CreateJob = () => {
  const [jobName, setJobName] = useState('');
  const [kbName, setKbName] = useState('');
  const [source, setSource] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job_name: jobName,
        kb_name: kbName,
        source: source,
        schedule: schedule,
      }),
    });
    setJobName('');
    setKbName('');
    setSource('');
    setSchedule('');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create Job</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="job_name" className="block text-lg font-medium mb-2">Job Name:</label>
          <input
            type="text"
            id="job_name"
            name="job_name"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
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
          <label htmlFor="source" className="block text-lg font-medium mb-2 mt-4">Source URL:</label>
          <input
            type="text"
            id="source"
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., https://example.com/data.txt"
          />
          <label htmlFor="schedule" className="block text-lg font-medium mb-2 mt-4">Schedule:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., 'every 1 hour'"
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
