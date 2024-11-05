import { Router } from 'express';
import usuariosController from '../Controllers/usuarios.controller.js';

const router = Router();

router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuario);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export default router;