// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    // 1. Pull the current nodes and edges from the Zustand store
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);
    
    // 2. Local State for Premium UI Overlay
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // 3. Handle the submit action
    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        
        try {
            // Create form data to match the FastAPI Form(...) requirement
            const formData = new FormData();
            formData.append("pipeline", JSON.stringify({ nodes, edges }));

            // Simulate slight delay for "processing" feel
            await new Promise(resolve => setTimeout(resolve, 600));

            // Send the POST request to the backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Parse the response and trigger the custom alert modal
            const data = await response.json();
            setResult(data);
            
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            setError("Failed to connect to the backend. Make sure your FastAPI server is running on port 8000!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button 
                type="button" 
                onClick={handleSubmit}
                className="submit-btn"
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.8 : 1 }}
            >
                {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="spinner"></div>
                        Analyzing Pipeline...
                    </div>
                ) : (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        Run Pipeline Analysis
                    </>
                )}
            </button>
            
            {/* Premium Custom Modal for Results */}
            {(result || error) && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div className="glass-node" style={{
                        padding: '30px',
                        borderRadius: '20px',
                        maxWidth: '400px',
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        {result ? (
                            <>
                                <div style={{ 
                                    width: '60px', height: '60px', 
                                    borderRadius: '50%', 
                                    background: result.is_dag ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: result.is_dag ? '#22c55e' : '#ef4444',
                                    marginBottom: '10px'
                                }}>
                                    {result.is_dag ? (
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    ) : (
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                    )}
                                </div>
                                <h2 style={{ margin: 0, color: '#fff', fontSize: '24px', fontWeight: '600' }}>Analysis Complete</h2>
                                
                                <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '5px' }}>{result.num_nodes}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Nodes</div>
                                    </div>
                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '5px' }}>{result.num_edges}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Edges</div>
                                    </div>
                                </div>

                                <div style={{ 
                                    width: '100%', 
                                    padding: '12px', 
                                    borderRadius: '12px',
                                    background: result.is_dag ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    border: `1px solid ${result.is_dag ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                    color: result.is_dag ? '#4ade80' : '#f87171',
                                    fontWeight: '500',
                                    fontSize: '15px'
                                }}>
                                    {result.is_dag ? "✓ Valid Directed Acyclic Graph" : "✕ Graph Contains Cycles"}
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ 
                                    width: '60px', height: '60px', borderRadius: '50%', 
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'
                                }}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                </div>
                                <h2 style={{ margin: 0, color: '#fff' }}>Connection Error</h2>
                                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{error}</p>
                            </>
                        )}

                        <button 
                            onClick={() => { setResult(null); setError(null); }}
                            className="submit-btn" 
                            style={{ 
                                width: '100%', 
                                justifyContent: 'center', 
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--border)',
                                color: 'var(--text-main)',
                                boxShadow: 'none'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                            Close Overlay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}