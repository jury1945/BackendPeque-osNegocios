import { Roles } from '../Models/roles.modelo.js';

class RolesService {
  async findAll() {
    return await Roles.findAll();
  }

  async findById(id) {
    return await Roles.findByPk(id);
  }

  async create(data) {
    return await Roles.create(data);
  }

  async update(id, data) {
    const role = await Roles.findByPk(id);
    if (!role) {
      return null;
    }
    return await role.update(data);
  }

  async delete(id) {
    const role = await Roles.findByPk(id);
    if (!role) {
      return null;
    }
    await role.destroy();
    return true;
  }
}

export default RolesService;