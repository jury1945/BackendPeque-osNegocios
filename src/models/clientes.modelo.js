import { Model, DataTypes } from "sequelize";

const CLIENTES_TABLA = 'clientes';

const ClientesSchema = {
  id_cliente: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: { 
    type: DataTypes.TEXT
  },
  telefono: { 
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(255)
  }
};

class Clientes extends Model { // Cambiado a 'Clientes' para mayor claridad
  static associate(models) {
    // Aquí puedes definir las asociaciones con otras tablas si es necesario
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTES_TABLA,
      modelName: 'Clientes',
      timestamps: true
    };
  }
}

export { CLIENTES_TABLA, ClientesSchema, Clientes }; // Exportado como 'Clientes'