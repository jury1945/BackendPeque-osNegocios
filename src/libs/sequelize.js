import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import setupModels from '../Models/index.js';
dotenv.config();  // Cargar las variables de entorno

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

export default sequelize;