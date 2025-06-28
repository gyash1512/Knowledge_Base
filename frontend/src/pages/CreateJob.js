import React, { useState } from 'react';

const CreateJob = () => {
  const [jobName, setJobName] = useState('');
  const [kbName, setKbName] = useState('');
  const [source, setSource] = useState('');
  const [schedule, setSchedule] = useState('');
  const [repeat, setRepeat] = useState('1h');

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
        repeat: repeat,
      }),
    });
    setJobName('');
    setKbName('');
    setSource('');
    setSchedule('');
    setRepeat('1h');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Create Job</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="job_name" className="block text-lg font-medium text-gray-300">Job Name</label>
            <input
              type="text"
              id="job_name"
              name="job_name"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
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
            <label htmlFor="source" className="block text-lg font-medium text-gray-300">Source URL</label>
            <input
              type="text"
              id="source"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., https://example.com/data.txt"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="schedule" className="block text-lg font-medium text-gray-300">Start At (UTC, optional)</label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., 2025-06-28 13:42:00"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg">
            <label htmlFor="repeat" className="block text-lg font-medium text-gray-300">Repeat</label>
            <input
              type="text"
              id="repeat"
              name="repeat"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm py-3 px-4"
              placeholder="e.g., 1h"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
