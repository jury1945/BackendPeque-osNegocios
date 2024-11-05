import express from 'express';
import sequelize from './libs/sequelize.js';
import { logRequest } from './middlewares/logger.js';
import usuariosRouter from './Routes/usuarios.routes.js';
import rolesRouter from './Routes/roles.routes.js';
import productosRouter from './Routes/productos.routes.js';
import categoriasRouter from './Routes/categorias.routes.js'

import { corsMiddleware } from './middlewares/cors.js';
import dotenv from 'dotenv';

dotenv.config(); // Carga la configuración de dotenv antes de usar process.env

const app = express();
const port = process.env.PORT || 8000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(corsMiddleware());
app.use(logRequest); // Mueve esto antes de las rutas

// Usa las rutas de usuario
app.use('/api/usuarios', usuariosRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/categorias',categoriasRouter)

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' }); // Mejora el manejo de errores
});

// Sincronización de la base de datos
sequelize.sync() // Considera el uso de { force: true } solo en desarrollo
  .then(() => {
    console.log('Base de datos sincronizada con éxito');
  })
  .catch((error) => {
    console.error('Error sincronizando la base de datos:', error);
  });

// Inicia el servidor
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default server;