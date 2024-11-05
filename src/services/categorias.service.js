import { CategoriasProductos } from "../Models/categorias.modelo.js"; 

class CategoriasService {
  async findAll() {
    return await CategoriasProductos.findAll();
  }

  async findById(id) {
    return await CategoriasProductos.findByPk(id);
  }

  async create(data) {
    return await CategoriasProductos.create(data);
  }

  async update(id, data) {
    const role = await CategoriasProductos.findByPk(id);
    if (!role) {
      return null;
    }
    return await role.CategoriasProductos(data);
  }

  async delete(id) {
    const role = await CategoriasProductos.findByPk(id);
    if (!role) {
      return null;
    }
    await role.destroy();
    return true;
  }
}

export default CategoriasService;