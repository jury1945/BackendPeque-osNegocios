import express from 'express';

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

// Inicia el servidor
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default server;