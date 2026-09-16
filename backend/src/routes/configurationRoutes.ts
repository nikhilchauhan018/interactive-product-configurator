import { Router } from 'express';
import { createOrUpdateConfiguration, getConfigurationById } from '../controllers/configurationController.js';

export const configurationRoutes = Router();

configurationRoutes.post('/', createOrUpdateConfiguration);
configurationRoutes.get('/:id', getConfigurationById);
