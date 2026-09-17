import { ConfiguratorShell } from '../features/configurator/components/ConfiguratorShell.js';
import { ConfiguratorProvider } from '../store/configuratorStore.js';

export function App() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorShell />
    </ConfiguratorProvider>
  );
}
