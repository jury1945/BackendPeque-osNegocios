import AuthService from '../services/autenticacion.service.js';

class AuthController {
  // Método para registrar un nuevo usuario
  async register(req, res) {
    const { nombre_usuario, apellido_usuario, descripcion, correo_usuario, password, telefono_usuario, role_id } = req.body;

    try {
      const { user, accessToken, refreshToken } = await AuthService.register({
        nombre_usuario,
        apellido_usuario,
        descripcion,
        correo_usuario,
        password,
        telefono_usuario,
        role_id
      });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(400).json({
        message: 'Error al registrar el usuario',
        details: error.message
      });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    const { correo_usuario, password } = req.body;

    try {
      const { user, accessToken, refreshToken } = await AuthService.login({
        correo_usuario,
        password
      });

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(400).json({
        message: 'Error al iniciar sesión',
        details: error.message
      });
    }
  }

  // Método para generar un nuevo token de acceso usando un token de refresco
  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Token de refresco es requerido' });
    }

    try {
      const userId = AuthService.verifyRefreshToken(refreshToken);
      const newAccessToken = AuthService.generateAccessToken(userId);

      res.status(200).json({
        message: 'Nuevo token de acceso generado',
        accessToken: newAccessToken
      });
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      res.status(401).json({
        message: 'Token de refresco inválido',
        details: error.message
      });
    }
  }
}

export default new AuthController();