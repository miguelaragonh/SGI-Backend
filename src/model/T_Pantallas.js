
const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Pantallas extends Model {}

T_Pantallas.init(
  {
    CN_Id_Pantalla: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "T_Pantallas",
    tableName: "T_Pantallas",
    timestamps: false,
  }
);

module.exports = T_Pantallas;
