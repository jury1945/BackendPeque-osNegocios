import RolesService from '../services/roles.service.js';

const service = new RolesService();

class RolesController {
  async getRoles(req, res) {
    try {
      const roles = await service.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los roles', error });
    }
  }

  async getRole(req, res) {
    const { id } = req.params;
    try {
      const role = await service.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el rol', error });
    }
  }

  async createRole(req, res) {
    const data = req.body;
    try {
      const newRole = await service.create(data);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el rol', error });
    }
  }

  async updateRole(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const role = await service.update(id, data);
      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el rol', error });
    }
  }

  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el rol', error });
    }
  }
}

export default new RolesController();