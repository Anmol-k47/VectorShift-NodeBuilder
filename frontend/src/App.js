import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PipelineToolbar />
      <div style={{ flex: 1, position: 'relative' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
