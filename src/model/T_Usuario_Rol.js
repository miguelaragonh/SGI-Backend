const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const T_Roles = require("./T_Roles");
const Usuario = require("./Usuario");

class T_Usuario_Rol extends Model {}

T_Usuario_Rol.init(
  {
    CN_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Codigo_Usuario: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: "CT_Codigo_Usuario",
      },
    },
    CN_Id_Rol: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: T_Roles,
        key: "CN_Id_Rol",
      },
    },
  },
  {
    sequelize,
    modelName: "T_Usuario_Rol",
    tableName: "T_Usuario_Rol",
    timestamps: false,
  }
);
T_Usuario_Rol.T_Roles = T_Roles.belongsTo(T_Roles, { foreignKey: "CN_Id_Rol" });
T_Usuario_Rol.Usuario = Usuario.belongsTo(Usuario, { foreignKey: "CT_Codigo_Usuario" });

module.exports = T_Usuario_Rol;
