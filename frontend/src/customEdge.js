import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from 'reactflow';
import { useReactFlow } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
            style={{
              width: 20, 
              height: 20, 
              borderRadius: '50%', 
              background: '#ef4444', 
              color: 'white', 
              border: '2px solid var(--surface)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: 1,
              padding: 0,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
