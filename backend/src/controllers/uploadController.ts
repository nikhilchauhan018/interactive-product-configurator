import { Request, Response, NextFunction } from 'express';
import { uploadService } from '../services/upload/uploadService.js';

export async function uploadGraphic(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await uploadService.processUpload(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
