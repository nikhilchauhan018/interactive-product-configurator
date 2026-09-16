import { Router } from 'express';
import { generateProductionPdf } from '../controllers/pdfController.js';

export const pdfRoutes = Router();

pdfRoutes.post('/', generateProductionPdf);
