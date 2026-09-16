import { apiRequest } from '../api/apiClient.js';
import { ProductConfiguration } from '@shared/types/configuration.js';

export async function saveRemoteConfiguration(
  config: ProductConfiguration
): Promise<{ configurationId: string; updatedAt: string }> {
  return apiRequest<{ configurationId: string; updatedAt: string }>('/api/configurations', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}

export async function fetchRemoteConfiguration(id: string): Promise<ProductConfiguration> {
  return apiRequest<ProductConfiguration>(`/api/configurations/${id}`);
}
