import { useState, useRef, useEffect } from 'react';
import { BaseNode } from "./BaseNode.js";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  useEffect(() => {
    // Auto-resize both width and height
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '40px'; // Reset height
      textAreaRef.current.style.width = '200px'; // Reset width
      
      const scrollHeight = textAreaRef.current.scrollHeight;
      const scrollWidth = textAreaRef.current.scrollWidth;

      textAreaRef.current.style.height = `${Math.max(40, scrollHeight)}px`;
      textAreaRef.current.style.width = `${Math.max(200, scrollWidth)}px`;
    }

    // Parse {{ variables }}
    const matches = [...currText.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g)].map(m => m[1]);
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars.map(v => ({ id: v, label: v })));
  }, [currText]);

  return (
    <BaseNode id={id} label="Text" selected={selected} inputs={variables} outputs={[{ id: 'output', label: 'output' }]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Text Content</span>
        <textarea 
          ref={textAreaRef} 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          className="premium-input nodrag nopan" 
          style={{ 
            resize: 'none', 
            overflow: 'hidden', 
            minHeight: '40px',
            minWidth: '200px',
            boxSizing: 'border-box'
          }} 
        />
      </div>
    </BaseNode>
  );
};