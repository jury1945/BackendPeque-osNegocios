import { Router } from 'express';
import facturasController from '../Controllers/facturas.controller.js';

const router = Router();

router.get('/', facturasController.getFacturas);
router.get('/:id', facturasController.getFactura);
router.post('/', facturasController.createFactura);
router.put('/:id', facturasController.updateFactura);
router.delete('/:id', facturasController.deleteFactura);

// Ruta para generar el PDF de la factura
router.get('/:id/imprimir', facturasController.printFactura);

export default router;