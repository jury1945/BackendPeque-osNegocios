import { Model, DataTypes } from "sequelize";

const FACTURAS_TABLA = 'facturas';

const FacturasSchema = {
  id_factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes', // Nombre de la tabla 'clientes'
      key: 'id_cliente'
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
};

class Facturas extends Model {
  static associate(models) {
    // Relación con Clientes (N:1) - cada factura pertenece a un cliente
    this.belongsTo(models.Clientes, { as: 'cliente', foreignKey: 'id_cliente' });
    
    // Relación con Detalles de Factura (1:N) - una factura tiene múltiples detalles
    this.hasMany(models.DetallesFactura, { as: 'detalles', foreignKey: 'id_factura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FACTURAS_TABLA,
      modelName: 'Facturas',
      timestamps: true
    };
  }
}

export { FACTURAS_TABLA, FacturasSchema, Facturas };