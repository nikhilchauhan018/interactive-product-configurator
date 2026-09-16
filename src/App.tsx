import React from 'react';
import { ConfiguratorProvider } from '../frontend/src/store/configuratorStore.js';
import { ConfiguratorShell } from '../frontend/src/features/configurator/components/ConfiguratorShell.js';

export function App() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorShell />
    </ConfiguratorProvider>
  );
}

export default App;
