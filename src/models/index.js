import { CategoriasProductos, CategoriasProductosSchema, CATEGORIAS_PRODUCTOS_TABLA } from './categorias.modelo.js';
import { Productos, ProductosSchema, PRODUCTOS_TABLA } from './productos.modelo.js';
import { Clientes, ClientesSchema, CLIENTES_TABLA } from './clientes.modelo.js'; 

function setupModels(sequelize) {
  Productos.init(ProductosSchema, Productos.config(sequelize));
  CategoriasProductos.init(CategoriasProductosSchema, CategoriasProductos.config(sequelize));
  Clientes.init(ClientesSchema, Clientes.config(sequelize)); // Inicializar el modelo Clientes

  // Asociaciones
  CategoriasProductos.associate(sequelize.models);
  Productos.associate(sequelize.models);
  // Clientes.associate(sequelize.models); // Si el modelo Clientes tiene asociaciones
}

export default setupModels;