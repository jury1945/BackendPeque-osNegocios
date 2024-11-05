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
  },
  // Aquí agregamos la relación con la tabla CategoriasProductos
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias_productos', // Cambiado a minúsculas para coincidir con la convención de PostgreSQL
      key: 'id_categoria'
    }
  }
};

class Productos extends Model {
  static associate(models) {
  

    // Asociación con la tabla CategoriasProductos (N:1)
    this.belongsTo(models.CategoriasProductos, { 
      as: 'categoria', 
      foreignKey: 'id_categoria' 
    });
  }

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