import { Model, DataTypes } from "sequelize";

const VENTAS_TABLA = 'ventas';

const VentasSchema = {
  id_venta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_factura: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'facturas', // Referencia a la tabla de facturas
      key: 'id_factura'
    }
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Efectivo' // Opciones como 'Efectivo', 'Tarjeta', 'Transferencia'
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Completada' // Opciones como 'Completada', 'Pendiente', 'Cancelada'
  },
  fecha_venta: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
};

class Ventas extends Model {
  static associate(models) {
    // Relación con Facturas (1:1) - cada venta tiene una factura
    this.belongsTo(models.Facturas, { as: 'factura', foreignKey: 'id_factura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTAS_TABLA,
      modelName: 'Ventas',
      timestamps: true
    };
  }
}

export { VENTAS_TABLA, VentasSchema, Ventas };