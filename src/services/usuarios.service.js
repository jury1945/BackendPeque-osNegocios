import { Usuarios } from '../Models/usuarios.modelo.js';
import bcrypt from 'bcrypt';

class UsuariosService {
  async findAll() {
    return await Usuarios.findAll();
  }

  async findById(id) {
    return await Usuarios.findByPk(id);
  }

  async create(data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    // Asegúrate de que role_id esté definido y no sea nulo
    if (!data.role_id) {
      throw new Error("El campo 'role_id' es obligatorio.");
    }
    return await Usuarios.create(data);
  }
  async update(id, data) {
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return null;
    }

    // Encripta la nueva contraseña si está presente en los datos de actualización
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    return await usuario.update(data);
  }

  async delete(id) {
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return null;
    }
    await usuario.destroy();
    return true;
  }

  // Método adicional para verificar la contraseña
  async checkPassword(id, password) {
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return false;
    }
    return await bcrypt.compare(password, usuario.password);
  }
}

export default UsuariosService;

