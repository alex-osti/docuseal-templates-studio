import { useState } from 'react';
import './index.css';

export default function App() {
  const [template, setTemplate] = useState({
    name: 'My Template',
    fields: []
  });

  const addField = (type) => {
    setTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, {
        type,
        name: `${type}_${Date.now()}`,
        x: 100,
        y: 100,
        required: true
      }]
    }));
  };

  const saveTemplate = async () => {
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template)
      });
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  return (
    <div className="app">
      <div className="toolbar">
        <button onClick={() => addField('text')}>Add Text Field</button>
        <button onClick={() => addField('signature')}>Add Signature</button>
        <button onClick={saveTemplate}>Save Template</button>
      </div>
      
      <div className="template-canvas">
        {template.fields.map(field => (
          <div 
            key={field.name}
            className={`field ${field.type}`}
            style={{ left: `${field.x}px`, top: `${field.y}px` }}
          >
            {field.type}
          </div>
        ))}
      </div>
    </div>
  );
}
