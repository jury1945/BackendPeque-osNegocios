import ReportesService from '../services/reportes.service.js';

const service = new ReportesService();

class ReportesController {
  async getVentasPorPeriodo(req, res) {
    const { fechaInicio, fechaFin } = req.query;
    try {
      const ventas = await service.ventasPorPeriodo(fechaInicio, fechaFin);
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener ventas por periodo', error: error.message });
    }
  }

  async getProductosMasVendidos(req, res) {
    const { fechaInicio, fechaFin, limite } = req.query;
    try {
      const productos = await service.productosMasVendidos(fechaInicio, fechaFin, parseInt(limite) || 5);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos más vendidos', error: error.message });
    }
  }

  async getVentasPorCliente(req, res) {
    const { fechaInicio, fechaFin } = req.query;
    try {
      const ventasPorCliente = await service.ventasPorCliente(fechaInicio, fechaFin);
      res.status(200).json(ventasPorCliente);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener ventas por cliente', error: error.message });
    }
  }
}

export default new ReportesController();