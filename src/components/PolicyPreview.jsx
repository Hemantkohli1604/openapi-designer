import React from 'react';
import useApiStore from '../store/apiStore';
import { generateApimPolicyXml } from '../utils/apimPolicyGenerator';

const PolicyPreview = () => {
  const { endpoints, policies } = useApiStore();
  const policyXmls = generateApimPolicyXml(endpoints, policies);

  return (
    <div>
      <h3>Generated Policies Per API Operation</h3>
      {Object.keys(policyXmls).length === 0 ? (
        <p>No policies generated. Please add API operations.</p>
      ) : (
        Object.entries(policyXmls).map(([operationId, policyXml]) => (
          <div key={operationId} style={{ marginBottom: '20px' }}>
            <h4>Policy for: {operationId.replace('_', ' ')}</h4>
            <pre style={{ background: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
              {policyXml}
            </pre>
          </div>
        ))
      )}
    </div>
  );
};

export default PolicyPreview;
