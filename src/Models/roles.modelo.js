// roles.modelo.js
import { DataTypes, Model } from 'sequelize';

const ROLES_TABLA = 'roles';

const RolesSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

class Roles extends Model {
  static associate(models) {
    this.hasMany(models.Usuarios, { as: 'usuarios', foreignKey: 'role_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_TABLA,
      modelName: 'Roles',
      timestamps: false,
      underscored: true,
    };
  }
}

export { Roles, RolesSchema, ROLES_TABLA };