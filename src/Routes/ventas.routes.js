import { Router } from 'express';
import ventasController from '../Controllers/ventas.controller.js';

const router = Router();

router.get('/', ventasController.getVentas);
router.get('/:id', ventasController.getVenta);
router.post('/', ventasController.createVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

export default router;