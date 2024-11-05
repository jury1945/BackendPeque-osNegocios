import VentasService from '../services/ventas.service.js';

const service = new VentasService();

class VentasController {
  async getVentas(req, res) {
    try {
      const ventas = await service.findAll();
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
  }

  async getVenta(req, res) {
    const { id } = req.params;
    try {
      const venta = await service.findById(id);
      if (!venta) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la venta', error: error.message });
    }
  }

  async createVenta(req, res) {
    const data = req.body;
    try {
      const newVenta = await service.create(data);
      res.status(201).json({ message: 'Venta registrada exitosamente', venta: newVenta });
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar la venta', error: error.message });
    }
  }

  async updateVenta(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedVenta = await service.update(id, data);
      res.status(200).json({ message: 'Venta actualizada exitosamente', venta: updatedVenta });
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la venta', error: error.message });
    }
  }

  async deleteVenta(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la venta', error: error.message });
    }
  }
}

export default new VentasController();