import UsuariosService from '../services/usuarios.service.js';

const service = new UsuariosService();

class UsuariosController {
  async getUsuarios(req, res) {
    try {
      const usuarios = await service.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }

  async getUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await service.findById(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  }

  async createUsuario(req, res) {
    const { nombre_usuario, apellido_usuario, correo_usuario, password, telefono_usuario, role_id, descripcion } = req.body;

    // Validaciones iniciales
    if (!nombre_usuario || !apellido_usuario || !correo_usuario || !password || !role_id) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
        details: 'Los campos nombre_usuario, apellido_usuario, correo_usuario, password y role_id son obligatorios.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo_usuario)) {
      return res.status(400).json({
        message: 'Formato de correo inválido',
        details: 'Por favor ingresa un correo electrónico válido.'
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Contraseña demasiado corta',
        details: 'La contraseña debe tener al menos 8 caracteres.'
      });
    }
    try {
      const newUsuario = await service.create(req.body);
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        usuario: newUsuario
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({
          message: 'El correo ya ha sido registrado para otro cliente.',
          details: 'Por favor, usa un correo diferente.'
        });
      } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
          message: 'El rol especificado no existe',
          details: 'Asegúrate de que el role_id corresponde a un rol válido en la base de datos.'
        });
      } else {
        res.status(500).json({
          message: 'Error al crear el usuario',
          details: error.message || 'Ocurrió un error inesperado.'
        });
      }
    }
  }

  async updateUsuario(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const usuario = await service.update(id, data);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }

  async deleteUsuario(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }
}

export default new UsuariosController();