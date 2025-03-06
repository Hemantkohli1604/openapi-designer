import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import useApiStore from '../store/apiStore';
import { generateOpenApi } from '../utils/openapiGenerator';

const SwaggerPreview = () => {
  const { apiInfo, endpoints, schemas } = useApiStore();
  const openApiSpec = generateOpenApi(apiInfo, endpoints, schemas);

  return (
    <div>
      <h3>Swagger Preview</h3>
      <SwaggerUI spec={openApiSpec} />
    </div>
  );
};

export default SwaggerPreview;
