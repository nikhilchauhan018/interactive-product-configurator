import { ProductConfiguration } from '@shared/types/configuration.js';
import { configurationRepository } from '../../repositories/configurationRepository.js';

export class ConfigurationService {
  async saveConfiguration(config: ProductConfiguration): Promise<{ configurationId: string; updatedAt: string }> {
    if (!config.productId || !config.size) {
      throw new Error('Invalid configuration payload.');
    }
    const id = await configurationRepository.save(config);
    return {
      configurationId: id,
      updatedAt: new Date().toISOString(),
    };
  }

  async getConfiguration(id: string): Promise<ProductConfiguration | null> {
    return configurationRepository.findById(id);
  }
}

export const configurationService = new ConfigurationService();
