import { Router } from 'express';
import productosController from '../Controllers/productos.controller.js';

const router = Router();

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProducto);
router.post('/', productosController.createProducto);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

export default router;