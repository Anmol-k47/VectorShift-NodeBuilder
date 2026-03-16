// llmNode.js

import { BaseNode } from "./BaseNode.js";

export const LLMNode = ({ id, selected }) => (
  <BaseNode id={id} label="LLM Engine" selected={selected} inputs={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]} outputs={[{ id: 'response', label: 'Response' }]} />
);