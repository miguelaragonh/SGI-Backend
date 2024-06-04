const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Roles extends Model {}

T_Roles.init(
  {
    CN_Id_Rol: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Sistema: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CN_Activo: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  },
  {
    sequelize,
    modelName: "T_Roles",
    tableName: "T_Roles",
    timestamps: false,
  }
);


module.exports = T_Roles;