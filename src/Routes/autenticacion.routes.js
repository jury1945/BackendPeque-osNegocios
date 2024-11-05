import { Router } from 'express';
import autenticacionController from '../Controllers/autenticacion.controller.js';
const router = Router();

router.post('/register', autenticacionController.register);

router.post('/login', autenticacionController.login);

router.post('/refresh-token', autenticacionController.refreshToken);

export default router;