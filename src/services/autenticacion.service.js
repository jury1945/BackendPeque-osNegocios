import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuarios } from '../models/usuarios.modelo.js';
import { Roles } from '../models/roles.modelo.js';
import { BCRYPT_SALT_ROUNDS, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_SECRET, JWT_REFRESH_SECRET } from '../config/auth.js';

class AuthService {
  async register({ nombre_usuario, apellido_usuario, descripcion, correo_usuario, password, telefono_usuario }) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const usuario = await Usuarios.create({
      nombre_usuario,
      apellido_usuario,
      descripcion,
      correo_usuario,
      password: hashedPassword,
      telefono_usuario,
      role_id: 1 
    });

    const accessToken = this.generateToken(usuario.id_usuario, 'access');
    const refreshToken = this.generateToken(usuario.id_usuario, 'refresh');

    const usuarioConRol = await Usuarios.findByPk(usuario.id_usuario, {
      include: [
        {
          model: Roles,
          as: 'role',
          attributes: ['nombre_role'], 
        },
      ],
    });

    const userResponse = {
      ...usuarioConRol.get(),
      roles: [usuarioConRol.role.nombre_role],
    };

    return { user: userResponse, accessToken, refreshToken };
  }

  async login({ correo_usuario, password }) {
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

    const accessToken = this.generateToken(usuario.id_usuario, 'access');
    const refreshToken = this.generateToken(usuario.id_usuario, 'refresh');

    const userResponse = {
      ...usuario.get(),
      roles: [usuario.role.nombre_role],
    };

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
      throw new Error('Token de refresco invalido');
    }
  }

  generateAccessToken(userId) {
    return this.generateToken(userId, 'access');
  }
}

export default new AuthService();