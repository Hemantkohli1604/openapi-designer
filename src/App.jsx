import ExportApimPolicy from './components/ExportApimPolicy';
import ApiForm from './components/ApiForm';
import SchemaEditor from './components/SchemaEditor';
import EndpointForm from './components/EndpointForm';
import ExportButtons from './components/ExportButtons';
import SwaggerPreview from './components/SwaggerPreview';
import PolicyConfig from './components/PolicyConfig';
import PolicyPreview from './components/PolicyPreview';

const App = () => {
  return (
    <div>
      <h2>OpenAPI Generator</h2>
      <ApiForm />
      <SchemaEditor />
      <EndpointForm />
      <PolicyConfig />
      <SwaggerPreview />
      <ExportButtons />
      <ExportApimPolicy />
      <PolicyPreview />
    </div>
  );
};

export default App;
