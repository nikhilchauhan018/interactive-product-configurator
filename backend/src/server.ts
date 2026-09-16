import { createApp } from './app.js';
import { serverConfig } from './config/serverConfig.js';

const app = createApp();

app.listen(serverConfig.port, () => {
  console.log(`[Configurator Backend] Server listening on port ${serverConfig.port}`);
  console.log(`[Configurator Backend] API endpoints mounted at ${serverConfig.apiPrefix}`);
});
