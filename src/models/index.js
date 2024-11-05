import { CategoriasProductos, CategoriasProductosSchema, CATEGORIAS_PRODUCTOS_TABLA } from './categorias.modelo.js';
import { Productos, ProductosSchema, PRODUCTOS_TABLA } from './productos.modelo.js';
import { Clientes, ClientesSchema, CLIENTES_TABLA } from './clientes.modelo.js'; 
import { Usuarios, UsuariosSchema, USUARIOS_TABLA } from './usuarios.modelo.js';
import { Roles, ROLES_TABLA, RolesSchema } from './roles.modelo.js';

function inicializarModelos(sequelize) {
  // Inicializar los modelos con sus esquemas y configuraciones
  Roles.init(RolesSchema, Roles.config(sequelize)); 
  Usuarios.init(UsuariosSchema, Usuarios.config(sequelize));
  Productos.init(ProductosSchema, Productos.config(sequelize));
  CategoriasProductos.init(CategoriasProductosSchema, CategoriasProductos.config(sequelize));
  Clientes.init(ClientesSchema, Clientes.config(sequelize));
}

function configurarAsociaciones(sequelize) {
  // Verifica que los modelos existen antes de asociarlos
  if (sequelize.models.Roles) {
    Roles.associate(sequelize.models); 
  }
  if (sequelize.models.Usuarios) {
    Usuarios.associate(sequelize.models);
  }
  if (sequelize.models.Productos) {
    Productos.associate(sequelize.models);
  }
  if (sequelize.models.CategoriasProductos) {
    CategoriasProductos.associate(sequelize.models);
  }
  if (sequelize.models.Clientes) {
    Clientes.associate(sequelize.models);
  }
}

function setupModels(sequelize) {
  try {
    inicializarModelos(sequelize);
    configurarAsociaciones(sequelize);
  } catch (error) {
    console.error('Error al configurar los modelos:', error);
    
    switch (error.name) {
      case 'SequelizeValidationError':
        console.error('Errores de validación:', error.errors);
        break;
      case 'SequelizeDatabaseError':
        console.error('Error de la base de datos:', error.original); 
        break;
      case 'SequelizeUniqueConstraintError':
        console.error('Error de restricción única:', error.errors);
        break;
      default:
        console.error('Error desconocido:', error);
        break;
    }
    
    // Puedes lanzar una excepción o registrar el error en un servicio de logging
    throw error; // Opcional: lanzar error para manejarlo a nivel superior si es necesario
  }
}

export default setupModels;