import { Router } from 'express';
import categoriasController from '../Controllers/categorias.controller.js';
const router = Router();

router.get('/', categoriasController.getCategorias);
router.get('/:id', categoriasController.getCategoria);
router.post('/', categoriasController.createCategoria);
router.put('/:id', categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

export default router;