import { Model, DataTypes } from "sequelize";

const CATEGORIAS_PRODUCTOS_TABLA = 'categorias_productos'; 

const CategoriasProductosSchema = {
  id_categoria: {
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
  }
};

class CategoriasProductos extends Model {
  static associate(models) {
    // Asociación con la tabla Productos (1:N)
    this.hasMany(models.Productos, { 
      as: 'productos', 
      foreignKey: 'id_categoria' 
    });
  }
  
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIAS_PRODUCTOS_TABLA,
      modelName: 'CategoriasProductos',
      timestamps: false 
    };
  }
}

// Exportaciones separadas para evitar el error
export { CATEGORIAS_PRODUCTOS_TABLA, CategoriasProductosSchema, CategoriasProductos };