import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import setupModels from '../Models/index.js';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

let sequelize; // Declarar sequelize fuera del try...catch

try {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: console.log, 
  });

  setupModels(sequelize);

  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida correctamente.');

} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default sequelize; // Exportar sequelize fuera del try...catch