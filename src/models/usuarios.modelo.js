
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export const USUARIOS_TABLA = 'usuarios';

export const UsuariosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_usuario: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [10, 15], 
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export class Usuarios extends Model {
  static associate(models) {
    this.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIOS_TABLA,
      modelName: 'Usuarios',
      timestamps: false,
      underscored: true,
    };
  }
  

}

