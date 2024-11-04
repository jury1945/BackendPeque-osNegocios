import { Productos, ProductosSchema, PRODUCTOS_TABLA } from './productos.modelo.js';
// Importar otros modelos aquí si tienes más

function setupModels(sequelize) {
  // Inicializar el modelo Productos
  Productos.init(ProductosSchema, Productos.config(sequelize));

  // Agregar otros modelos aquí si tienes más
  // Ejemplo:
  // Categoria.init(CategoriaSchema, Categoria.config(sequelize));

  // Ejecutar las asociaciones de cada modelo
  // Categoria.associate(sequelize.models); // Si tienes otros modelos relacionados
}

export default setupModels;