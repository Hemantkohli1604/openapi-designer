import React from 'react';
import { Link } from 'react-router-dom';
import useApiStore from '../store/apiStore';

const MainPage = () => {
  const { apiInfo, endpoints } = useApiStore();

  const openApiJson = {
    openapi: "3.0.0",
    info: apiInfo,
    paths: endpoints.reduce((acc, endpoint) => {
      if (!acc[endpoint.path]) acc[endpoint.path] = {};
      acc[endpoint.path][endpoint.method.toLowerCase()] = {
        summary: endpoint.summary || "",
        responses: { "200": { description: "Success" } }
      };
      return acc;
    }, {})
  };

  return (
    <div>
      <h2>OpenAPI Definition</h2>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>
        {JSON.stringify(openApiJson, null, 2)}
      </pre>

      <h3>Configure Policies:</h3>
      <ul>
        {endpoints.map((endpoint, index) => (
          <li key={index}>
            <Link to={`/policy/${endpoint.method}_${endpoint.path.replace(/\//g, '_')}`}>
              Configure Policy for {endpoint.method.toUpperCase()} {endpoint.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
