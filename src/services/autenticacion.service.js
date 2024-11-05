import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuarios } from '../Models/usuarios.modelo.js';
import { Roles } from '../Models/roles.modelo.js';
import { BCRYPT_SALT_ROUNDS, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_SECRET, JWT_REFRESH_SECRET } from '../config/auth.js';

class AuthService {
  async register({ nombre_usuario, apellido_usuario, descripcion, correo_usuario, password, telefono_usuario, role_id = 1 }) {
    // Validaciones iniciales
    if (!nombre_usuario || !apellido_usuario || !correo_usuario || !password) {
      throw new Error('Todos los campos obligatorios deben estar presentes');
    }

    // Validación y encriptación de contraseña
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // Crear el usuario
    try {
      const usuario = await Usuarios.create({
        nombre_usuario,
        apellido_usuario,
        descripcion,
        correo_usuario,
        password: hashedPassword,
        telefono_usuario,
        role_id 
      });

      // Generar tokens
      const accessToken = this.generateToken(usuario.id, 'access');
      const refreshToken = this.generateToken(usuario.id, 'refresh');

      // Obtener usuario con rol
      const usuarioConRol = await this.getUsuarioConRol(usuario.id);

      return { user: usuarioConRol, accessToken, refreshToken };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El correo ya está en uso');
      } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error('El rol especificado no existe');
      }
      throw new Error('Error al registrar el usuario');
    }
  }

  async login({ correo_usuario, password }) {
    if (!correo_usuario || !password) {
      throw new Error('Correo y contraseña son obligatorios');
    }

    const usuario = await Usuarios.findOne({
      where: { correo_usuario },
      include: [
        {
          model: Roles,
          as: 'role',
          attributes: ['nombre_role'],
        },
      ],
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const accessToken = this.generateToken(usuario.id, 'access');
    const refreshToken = this.generateToken(usuario.id, 'refresh');

    const userResponse = this.formatUserResponse(usuario);

    return { user: userResponse, accessToken, refreshToken };
  }

  generateToken(userId, type = 'access') {
    const secret = type === 'access' ? JWT_SECRET : JWT_REFRESH_SECRET;
    const expiresIn = type === 'access' ? JWT_EXPIRES_IN : JWT_REFRESH_EXPIRES_IN;
    return jwt.sign({ userId }, secret, { expiresIn });
  }

  verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      return decoded.userId;
    } catch (err) {
      throw new Error('Token de refresco inválido');
    }
  }

  generateAccessToken(userId) {
    return this.generateToken(userId, 'access');
  }

  async getUsuarioConRol(id) {
    const usuario = await Usuarios.findByPk(id, {
      include: [
        {
          model: Roles,
          as: 'role',
          attributes: ['nombre_role'],
        },
      ],
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return this.formatUserResponse(usuario);
  }

  formatUserResponse(usuario) {
    return {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      apellido_usuario: usuario.apellido_usuario,
      correo_usuario: usuario.correo_usuario,
      telefono_usuario: usuario.telefono_usuario,
      descripcion: usuario.descripcion,
      roles: [usuario.role.nombre_role],
    };
  }
}

export default new AuthService();