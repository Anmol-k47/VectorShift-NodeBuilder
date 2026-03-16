import { Handle, Position, NodeResizer, useReactFlow } from 'reactflow';
import { useState } from 'react';

export const BaseNode = ({ id, label, inputs = [], outputs = [], children, selected }) => {
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  const handleSelect = (e) => {
    // Force selection of this node exclusively when clicked inside its body
    setNodes((nds) => nds.map((n) => ({
      ...n,
      selected: n.id === id
    })));
  };

  return (
    <div className="glass-node" 
      onMouseDownCapture={handleSelect}
      style={{ 
      padding: '20px', 
      borderRadius: '16px', 
      minWidth: '220px',
      minHeight: '100px',
      position: 'relative',
      fontFamily: 'Outfit, sans-serif',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <NodeResizer minWidth={220} minHeight={100} isVisible={selected} lineStyle={{ borderColor: 'var(--primary)' }} handleStyle={{ width: 8, height: 8, background: 'var(--primary)' }} />
      
      {/* Delete Button */}
      <button 
        className="nodrag nopan"
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          transition: 'all 0.2s',
          zIndex: 10
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div style={{ 
        fontWeight: '600', 
        fontSize: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        paddingBottom: '12px', 
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        paddingRight: '25px'
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
        {label}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Input Handles Row */}
        {inputs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {inputs.map((input) => (
              <div key={input.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Handle 
                  type="target" 
                  position={Position.Left} 
                  id={`${id}-${input.id}`} 
                  style={{ left: '-26px', width: '12px', height: '12px', zIndex: 100 }} 
                />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{input.label || input.id}</span>
              </div>
            ))}
          </div>
        )}

        {/* Node Body / Form Controls */}
        {children && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            {children}
          </div>
        )}

        {/* Output Handles Row */}
        {outputs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {outputs.map((output) => (
              <div key={output.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{output.label || output.id}</span>
                <Handle 
                  type="source" 
                  position={Position.Right} 
                  id={`${id}-${output.id}`} 
                  style={{ right: '-26px', width: '12px', height: '12px', zIndex: 100 }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};