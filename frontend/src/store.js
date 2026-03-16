// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => {
    let past = [];
    
    const saveHistory = () => {
        past.push({ nodes: get().nodes, edges: get().edges });
        if (past.length > 50) past.shift(); // Keep history size manageable
    };

    return {
        nodes: [],
        edges: [],
        undo: () => {
            if (past.length > 0) {
                const prev = past.pop();
                set({ nodes: prev.nodes, edges: prev.edges });
            }
        },
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        saveHistory();
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
        // Only save history if it's a significant user action, like removal
        if (changes.some(c => c.type === 'remove')) {
            saveHistory();
        }
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        if (changes.some(c => c.type === 'remove')) {
            saveHistory();
        }
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        saveHistory();
        set({
            edges: addEdge({...connection, type: 'custom', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        // We can save history for field edits if desired, but might be too noisy for text fields.
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            }),
        });
    },
    };
});
