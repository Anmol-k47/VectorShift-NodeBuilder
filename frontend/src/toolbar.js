// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '15px 20px', 
            background: 'var(--surface)', 
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            zIndex: 100,
            position: 'relative',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-muted)', minWidth: '100px' }}>Core Nodes:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-muted)', minWidth: '100px' }}>Custom Nodes:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <DraggableNode type='cloudEdge' label='Cloud-Edge' />
                        <DraggableNode type='ebpf' label='eBPF' />
                        <DraggableNode type='firebase' label='Firebase Auth' />
                        <DraggableNode type='android' label='Android Build' />
                        <DraggableNode type='ml' label='ML Model' />
                    </div>
                </div>
            </div>
        </div>
    );
};