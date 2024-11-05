import { Model, DataTypes } from "sequelize";

const DETALLES_FACTURA_TABLA = 'detalles_factura';

const DetallesFacturaSchema = {
  id_detalle: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_factura: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'facturas', // Nombre de la tabla 'facturas'
      key: 'id_factura'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', // Nombre de la tabla 'productos'
      key: 'id_producto'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
};

class DetallesFactura extends Model {
  static associate(models) {
    // Relación con Facturas (N:1) - cada detalle pertenece a una factura
    this.belongsTo(models.Facturas, { as: 'factura', foreignKey: 'id_factura' });

    // Relación con Productos (N:1) - cada detalle se refiere a un producto
    this.belongsTo(models.Productos, { as: 'producto', foreignKey: 'id_producto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLES_FACTURA_TABLA,
      modelName: 'DetallesFactura',
      timestamps: true
    };
  }
}

export { DETALLES_FACTURA_TABLA, DetallesFacturaSchema, DetallesFactura };