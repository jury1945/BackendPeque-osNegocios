import { Facturas } from '../Models/facturas.modelo.js';
import { DetallesFactura } from '../Models/detallefactura.modelo.js';
import { Productos } from '../Models/productos.modelo.js';
import { Clientes } from '../Models/clientes.modelo.js';
import { Sequelize } from 'sequelize';

class ReportesService {
  // Total de ventas en un periodo
  async ventasPorPeriodo(fechaInicio, fechaFin) {
    return await Facturas.findAll({
      where: {
        fecha: {
          [Sequelize.Op.between]: [fechaInicio, fechaFin]
        }
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('fecha')), 'fecha'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_ventas']
      ],
      group: ['fecha'],
      order: [['fecha', 'ASC']]
    });
  }

  // Productos más vendidos
  async productosMasVendidos(fechaInicio, fechaFin, limite = 5) {
    return await DetallesFactura.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [fechaInicio, fechaFin]
        }
      },
      attributes: [
        'id_producto',
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'total_cantidad'],
      ],
      include: [
        {
          model: Productos,
          as: 'producto',
          attributes: ['nombre', 'precio_unitario']
        }
      ],
      group: ['id_producto', 'producto.id_producto'],
      order: [[Sequelize.fn('SUM', Sequelize.col('cantidad')), 'DESC']],
      limit: limite
    });
  }

  // Ventas por cliente
  async ventasPorCliente(fechaInicio, fechaFin) {
    return await Facturas.findAll({
      where: {
        fecha: {
          [Sequelize.Op.between]: [fechaInicio, fechaFin]
        }
      },
      attributes: [
        'id_cliente',
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_ventas']
      ],
      include: [
        {
          model: Clientes,
          as: 'cliente',
          attributes: ['nombre', 'apellidos', 'email']
        }
      ],
      group: ['id_cliente', 'cliente.id_cliente'],
      order: [[Sequelize.fn('SUM', Sequelize.col('total')), 'DESC']]
    });
  }
}

export default ReportesService;