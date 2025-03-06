import React from 'react';
import { useParams } from 'react-router-dom';
import useApiStore from '../store/apiStore';
import { generateApimPolicyXml } from '../utils/apimPolicyGenerator';

const PolicyPage = () => {
  const { operationId } = useParams();
  const { endpoints, policies, setPolicies } = useApiStore();

  // Find the operation based on the URL param
  const [method, ...pathParts] = operationId.split('_');
  const path = "/" + pathParts.join('/');
  const operation = endpoints.find(ep => ep.method === method.toUpperCase() && ep.path === path);

  if (!operation) {
    return <h2>Operation not found!</h2>;
  }

  const policyXml = generateApimPolicyXml([operation], policies)[operationId];

  return (
    <div>
      <h2>Configure Policy for {operation.method.toUpperCase()} {operation.path}</h2>

      <h3>Rate Limiting</h3>
      <input
        type="number"
        value={policies.rateLimit?.calls || ""}
        onChange={(e) => setPolicies({ ...policies, rateLimit: { ...policies.rateLimit, calls: e.target.value } })}
      />
      <input
        type="number"
        value={policies.rateLimit?.renewalPeriod || ""}
        onChange={(e) => setPolicies({ ...policies, rateLimit: { ...policies.rateLimit, renewalPeriod: e.target.value } })}
      />

      <h3>Generated Policy</h3>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>
        {policyXml}
      </pre>
    </div>
  );
};

export default PolicyPage;
