import React, { useState } from 'react';
import useApiStore from '../store/apiStore';

const EndpointForm = () => {
  const { endpoints, addEndpoint, updateEndpoint } = useApiStore();
  const [newEndpoint, setNewEndpoint] = useState({ path: '', method: 'GET' });

  const handleAddEndpoint = () => {
    if (!newEndpoint.path) {
      alert("Path cannot be empty!");
      return;
    }
    addEndpoint(newEndpoint);
    console.log("Endpoints after adding:", useApiStore.getState().endpoints);
    setNewEndpoint({ path: '', method: 'GET' });
  };

  return (
    <div>
      <h3>API Endpoints</h3>
      <input
        type="text"
        placeholder="Enter API path"
        value={newEndpoint.path}
        onChange={(e) => setNewEndpoint({ ...newEndpoint, path: e.target.value })}
      />
      <select
        value={newEndpoint.method}
        onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value })}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <button onClick={handleAddEndpoint}>Add Endpoint</button>

      {endpoints.length === 0 ? <p>No endpoints added.</p> : (
        endpoints.map((endpoint, index) => (
          <div key={index}>
            <p>{endpoint.path} ({endpoint.method})</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EndpointForm;
