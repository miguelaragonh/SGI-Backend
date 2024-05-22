const sequelize = require('../db/config')
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {}

Usuario.init(
  {
    CT_Codigo_Usuario: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
    },
    CT_Nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Contraseña: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Usuario: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    CN_Numero_Telefonico: {
      type: DataTypes.INTEGER,
    },
    CT_Puesto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
  }
);

module.exports = Usuario;
