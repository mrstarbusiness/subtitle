"use client";
import ConfigModal from '@/components/dashboard/ConfigModal';
import { useEffect, useState } from 'react';

export default function Configurations() {
  const [configs, setConfigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    const response = await fetch('/api/configurations');
    const data = await response.json();
    setConfigs(data);
  };

  const handleSave = async (config) => {
    const method = config.id ? 'PATCH' : 'POST';
    const endpoint = config.id ? `/api/configurations/${config.id}` : '/api/configurations';
    await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    fetchConfigs();
    setShowModal(false);
    setCurrentConfig(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/configuration/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchConfigs();
  };

  return (
    <div className="px-4">
      <div className="flex justify-between">
      <h1 className="text-2xl mb-4">Configurations</h1>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded mb-4">Add Configuration</button>
      </div>
      <table class="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-3 px-6 text-left">Type</th>
            <th class="py-3 px-6 text-left">Value</th>
            <th class="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs && configs.map((config) => (
            <tr key={config.id}>
              <td className="border p-2">{config.type}</td>
              <td className="border p-2">{config.value}</td>
              <td className="border p-2 ">
               <div className="flex gap-1">
               <button onClick={() => { setCurrentConfig(config); setShowModal(true); }} className="mr-2 bg-cyan-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => {
                    if(confirm('Are you sure to delete?')){handleDelete(config.id)}
                }} className="bg-red-500 text-white p-2 rounded">Delete</button>
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfigModal
        showModal={showModal}
        onClose={() => { setShowModal(false); setCurrentConfig(null); }}
        onSave={handleSave}
        config={currentConfig}
      />
    </div>
  );
}
