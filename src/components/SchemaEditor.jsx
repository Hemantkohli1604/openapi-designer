import React, { useState } from 'react';
import useApiStore from '../store/apiStore';

const SchemaEditor = () => {
  const { schemas, addSchema } = useApiStore();
  const [schemaName, setSchemaName] = useState('');
  const [schemaJson, setSchemaJson] = useState('{}');

  const handleAddSchema = () => {
    try {
      const parsedSchema = JSON.parse(schemaJson);
      addSchema(schemaName, parsedSchema);
      setSchemaName('');
      setSchemaJson('{}');
    } catch (error) {
      alert('Invalid JSON schema');
    }
  };

  return (
    <div>
      <h3>Component Schemas</h3>
      <input
        type="text"
        placeholder="Schema Name"
        value={schemaName}
        onChange={(e) => setSchemaName(e.target.value)}
      />
      <textarea
        rows="6"
        placeholder="JSON Schema"
        value={schemaJson}
        onChange={(e) => setSchemaJson(e.target.value)}
      />
      <button onClick={handleAddSchema}>Add Schema</button>

      <h4>Defined Schemas</h4>
      <pre>{JSON.stringify(schemas, null, 2)}</pre>
    </div>
  );
};

export default SchemaEditor;
