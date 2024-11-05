import { Router } from 'express';
import reportesController from '../Controllers/reportes.controller.js';

const router = Router();

router.get('/ventas-por-periodo', reportesController.getVentasPorPeriodo);
router.get('/productos-mas-vendidos', reportesController.getProductosMasVendidos);
router.get('/ventas-por-cliente', reportesController.getVentasPorCliente);

export default router;