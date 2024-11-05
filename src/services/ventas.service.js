import { Ventas } from '../Models/ventas.modelo.js';
import { Facturas } from '../Models/facturas.modelo.js';

class VentasService {
  async findAll() {
    return await Ventas.findAll({
      include: { association: 'factura' }
    });
  }

  async findById(id) {
    return await Ventas.findByPk(id, {
      include: { association: 'factura' }
    });
  }

  async create(data) {
    return await Ventas.create(data);
  }

  async update(id, data) {
    const venta = await Ventas.findByPk(id);
    if (!venta) {
      throw new Error(`Venta con id ${id} no encontrada`);
    }

    return await venta.update(data);
  }

  async delete(id) {
    const venta = await Ventas.findByPk(id);
    if (!venta) {
      throw new Error(`Venta con id ${id} no encontrada`);
    }

    await venta.destroy();
    return true;
  }
}

export default VentasService;