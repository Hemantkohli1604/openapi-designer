import React, { useState } from 'react';
import useApiStore from '../store/apiStore';

const PolicyConfig = () => {
  const { policies, setPolicies } = useApiStore();
  const [localPolicies, setLocalPolicies] = useState(policies);

  const handleChange = (field, value) => {
    setLocalPolicies((prev) => ({ ...prev, [field]: value }));
  };

  const savePolicies = () => {
    setPolicies(localPolicies);
    console.log("Updated Policies:", localPolicies);
    alert("Policies saved!");
  };

  return (
    <div>
      <h3>Configure Policies</h3>

      {/* Rate Limiting */}
      <h4>Rate Limiting</h4>
      <label>Requests per Minute: </label>
      <input
        type="number"
        value={localPolicies.rateLimit.calls}
        onChange={(e) => handleChange('rateLimit', { ...localPolicies.rateLimit, calls: e.target.value })}
      />
      <label>Renewal Period (seconds): </label>
      <input
        type="number"
        value={localPolicies.rateLimit.renewalPeriod}
        onChange={(e) => handleChange('rateLimit', { ...localPolicies.rateLimit, renewalPeriod: e.target.value })}
      />

      {/* CORS */}
      <h4>CORS Settings</h4>
      <label>Allowed Origins (comma-separated): </label>
      <input
        type="text"
        value={localPolicies.cors.allowedOrigins.join(', ')}
        onChange={(e) => handleChange('cors', { ...localPolicies.cors, allowedOrigins: e.target.value.split(', ') })}
      />

      {/* Authentication */}
      <h4>Authentication</h4>
      <label>
        <input
          type="checkbox"
          checked={localPolicies.authentication.jwtEnabled}
          onChange={(e) => handleChange('authentication', { ...localPolicies.authentication, jwtEnabled: e.target.checked })}
        />
        Enable JWT Authentication
      </label>

      <label>
        <input
          type="checkbox"
          checked={localPolicies.authentication.apiKeyRequired}
          onChange={(e) => handleChange('authentication', { ...localPolicies.authentication, apiKeyRequired: e.target.checked })}
        />
        Require API Key
      </label>

      <h4>IP Whitelisting</h4>
      <textarea
        rows="3"
        placeholder="Enter IPs (comma-separated)"
        value={localPolicies.authentication.ipWhitelist.join(', ')}
        onChange={(e) => handleChange('authentication', { ...localPolicies.authentication, ipWhitelist: e.target.value.split(', ') })}
      />

      <button onClick={savePolicies}>Save Policies</button>
    </div>
  );
};

export default PolicyConfig;
