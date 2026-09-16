import { ProductConfiguration } from '@shared/types/configuration.js';

export interface IConfigurationRepository {
  save(config: ProductConfiguration): Promise<string>;
  findById(id: string): Promise<ProductConfiguration | null>;
  listRecent(limit?: number): Promise<ProductConfiguration[]>;
}

export class MemoryConfigurationRepository implements IConfigurationRepository {
  private store = new Map<string, ProductConfiguration>();

  async save(config: ProductConfiguration): Promise<string> {
    const id = config.id || `cfg_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const savedConfig = {
      ...config,
      id,
      updatedAt: new Date().toISOString(),
    };
    this.store.set(id, savedConfig);
    return id;
  }

  async findById(id: string): Promise<ProductConfiguration | null> {
    return this.store.get(id) || null;
  }

  async listRecent(limit: number = 10): Promise<ProductConfiguration[]> {
    return Array.from(this.store.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }
}

export const configurationRepository = new MemoryConfigurationRepository();
