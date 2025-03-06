import React from 'react';
import useApiStore from '../store/apiStore';

const ApiForm = () => {
  const { apiInfo, setApiInfo } = useApiStore();

  return (
    <div>
      <h3>API Details</h3>
      <input 
        type="text" 
        placeholder="API Title" 
        value={apiInfo.title} 
        onChange={(e) => setApiInfo({ ...apiInfo, title: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Version" 
        value={apiInfo.version} 
        onChange={(e) => setApiInfo({ ...apiInfo, version: e.target.value })}
      />
      <textarea 
        placeholder="Description" 
        value={apiInfo.description} 
        onChange={(e) => setApiInfo({ ...apiInfo, description: e.target.value })}
      />
    </div>
  );
};

export default ApiForm;
