import { Model, DataTypes } from "sequelize";

const PRODUCTOS_TABLA = 'productos';

const ProductosSchema = {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

class Productos extends Model {
//   static associate(models) {
//     // Definir la asociación con DetallesFactura si existe
//     this.hasMany(models.DetallesFactura, { 
//       as: 'detallesFactura', 
//       foreignKey: 'id_producto' 
//     });
//   }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTOS_TABLA,
      modelName: 'Productos',
      timestamps: true 
    };
  }
}

export { PRODUCTOS_TABLA, ProductosSchema, Productos };