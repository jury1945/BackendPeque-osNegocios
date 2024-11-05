import { Facturas } from '../Models/facturas.modelo.js';
import { Productos } from '../Models/productos.modelo.js';
import { DetallesFactura } from '../Models/detallefactura.modelo.js';
class FacturasService {
  async findAll() {
    return await Facturas.findAll({
      include: [
        { association: 'cliente' },
        { association: 'detalles', include: [{ association: 'producto' }] }
      ]
    });
  }

  async findById(id) {
    return await Facturas.findByPk(id, {
      include: [
        { association: 'cliente' },
        { association: 'detalles', include: [{ association: 'producto' }] }
      ]
    });
  }

  async create(data) {
    const { id_cliente, detalles } = data;

    // Crear la factura con total temporalmente en 0
    const factura = await Facturas.create({
      id_cliente,
      total: 0
    });

    let totalFactura = 0;

    // Procesar cada detalle para ajustar inventario y calcular el total
    for (const detalle of detalles) {
      const producto = await Productos.findByPk(detalle.id_producto);
      if (!producto) throw new Error(`Producto con id ${detalle.id_producto} no encontrado`);

      // Verificar que haya suficiente stock
      if (producto.stock < detalle.cantidad) {
        throw new Error(`Stock insuficiente para el producto ${producto.nombre}. Stock disponible: ${producto.stock}`);
      }

      // Reducir el stock del producto
      producto.stock -= detalle.cantidad;
      await producto.save();

      // Calcular el subtotal para el detalle de factura
      const subtotal = producto.precio_unitario * detalle.cantidad;
      totalFactura += subtotal;

      // Crear el detalle de factura
      await DetallesFactura.create({
        id_factura: factura.id_factura,
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio_unitario: producto.precio_unitario,
        subtotal
      });
    }

    // Actualizar el total de la factura después de procesar los detalles
    factura.total = totalFactura;
    await factura.save();

    // Retornar la factura completa con sus detalles
    return await this.findById(factura.id_factura);
  }

  async update(id, data) {
    const factura = await Facturas.findByPk(id);
    if (!factura) {
      throw new Error(`Factura con id ${id} no encontrada`);
    }

    return await factura.update(data);
  }

  async delete(id) {
    const factura = await Facturas.findByPk(id);
    if (!factura) {
      throw new Error(`Factura con id ${id} no encontrada`);
    }

    // Eliminar detalles asociados
    await DetallesFactura.destroy({ where: { id_factura: id } });

    // Eliminar la factura
    await factura.destroy();
    return true;
  }
}

export default FacturasService;