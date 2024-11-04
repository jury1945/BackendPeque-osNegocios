import express from 'express';
import sequelize from './libs/sequelize.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Define las rutas

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Sincronización de la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database sincronizada con exito');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });


// Inicia el servidor
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default server;