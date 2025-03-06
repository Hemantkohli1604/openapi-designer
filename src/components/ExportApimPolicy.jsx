import React from 'react';
import useApiStore from '../store/apiStore';
import { generateApimPolicyXml } from '../utils/apimPolicyGenerator';

const ExportApimPolicy = () => {
  const { endpoints, policies } = useApiStore();

  console.log("Exporting XML - Endpoints:", endpoints);

  const downloadXml = () => {
    if (!endpoints || endpoints.length === 0) {
      alert("No endpoints added! Please add at least one endpoint.");
      return;
    }

    const apimPolicyXml = generateApimPolicyXml(endpoints, policies);

    const blob = new Blob([apimPolicyXml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'apim-policy.xml';
    link.click();
  };

  return <button onClick={downloadXml}>Export APIM Policy XML</button>;
};


export default ExportApimPolicy;
