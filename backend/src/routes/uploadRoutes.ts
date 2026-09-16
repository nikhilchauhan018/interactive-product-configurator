import { Router } from 'express';
import { uploadGraphic } from '../controllers/uploadController.js';

export const uploadRoutes = Router();

uploadRoutes.post('/', uploadGraphic);
