import { Request, Response, NextFunction } from 'express';
import { pdfService } from '../services/pdf/pdfService.js';

export async function generateProductionPdf(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await pdfService.generatePdf(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
