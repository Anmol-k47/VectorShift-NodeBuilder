import json
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    # Adjacency list for graph
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in graph:
            graph[edge['source']].append(edge['target'])
            
    # DFS Cycle Detection
    def is_cyclic(node, visited, rec_stack):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if is_cyclic(neighbor, visited, rec_stack): return True
            elif neighbor in rec_stack: return True
        rec_stack.remove(node)
        return False

    visited, rec_stack = set(), set()
    is_dag = True

    for node in nodes:
        if node['id'] not in visited:
            if is_cyclic(node['id'], visited, rec_stack):
                is_dag = False
                break

    return {'num_nodes': len(nodes), 'num_edges': len(edges), 'is_dag': is_dag}