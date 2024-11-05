import { Productos } from '../Models/productos.modelo.js';

class ProductosService {
  async findAll() {
    // Recupera todos los productos junto con su categoría
    return await Productos.findAll({ include: 'categoria' });
  }

  async findById(id) {
    // Busca un producto por su ID y también incluye la categoría asociada
    return await Productos.findByPk(id, { include: 'categoria' });
  }

  async create(data) {
    // Crea un nuevo producto con los datos recibidos
    return await Productos.create(data);
  }

  async update(id, data) {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return null;
    }
    // Actualiza el producto con los datos recibidos
    return await producto.update(data);
  }

  async delete(id) {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return null;
    }
    // Elimina el producto
    await producto.destroy();
    return true;
  }
}

export default ProductosService;