import React from 'react';
import useApiStore from '../store/apiStore';
import { generateOpenApi } from '../utils/openapiGenerator';
import YAML from 'yamljs';

const ExportButtons = () => {
  const { apiInfo, endpoints } = useApiStore();
  const openApiSpec = generateOpenApi(apiInfo, endpoints);

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <button onClick={() => downloadFile(JSON.stringify(openApiSpec, null, 2), 'openapi.json')}>
        Export JSON
      </button>
      <button onClick={() => downloadFile(YAML.stringify(openApiSpec, 4), 'openapi.yaml')}>
        Export YAML
      </button>
    </div>
  );
};

export default ExportButtons;
