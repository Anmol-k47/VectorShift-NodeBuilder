// customNodes.js

import { BaseNode } from "./BaseNode.js";

export const CloudEdgeNode = ({ id }) => (
  <BaseNode id={id} label="Cloud-Edge Router" inputs={[{ id: 'data_stream', label: 'Data Stream' }]} outputs={[{ id: 'cloud', label: 'Cloud' }, { id: 'edge', label: 'Edge' }]} />
);

export const EBPFNode = ({ id }) => (
  <BaseNode id={id} label="eBPF Tracer" inputs={[{ id: 'kernel_hook', label: 'Kernel Hook' }]} outputs={[{ id: 'telemetry', label: 'Telemetry' }]} />
);

export const FirebaseNode = ({ id }) => (
  <BaseNode id={id} label="Firebase Auth" inputs={[{ id: 'credentials', label: 'Credentials' }]} outputs={[{ id: 'token', label: 'JWT Token' }]} />
);

export const AndroidNode = ({ id }) => (
  <BaseNode id={id} label="Android Build" inputs={[{ id: 'source_code', label: 'Source Code' }]} outputs={[{ id: 'apk', label: 'APK File' }]} />
);

export const MLNode = ({ id }) => (
  <BaseNode id={id} label="ML Predictor" inputs={[{ id: 'tensor', label: 'Tensor' }, { id: 'weights', label: 'Weights' }]} outputs={[{ id: 'prediction', label: 'Prediction' }]} />
);
