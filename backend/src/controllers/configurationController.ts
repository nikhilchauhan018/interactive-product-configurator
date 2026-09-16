import { Request, Response, NextFunction } from 'express';
import { configurationService } from '../services/configuration/configurationService.js';

export async function createOrUpdateConfiguration(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await configurationService.saveConfiguration(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function getConfigurationById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id;
    const config = await configurationService.getConfiguration(id);
    if (!config) {
      res.status(404).json({
        success: false,
        error: { message: `Configuration '${id}' not found.` },
      });
      return;
    }
    res.json({
      success: true,
      data: config,
    });
  } catch (err) {
    next(err);
  }
}
