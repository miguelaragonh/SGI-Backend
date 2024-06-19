const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Estados extends Model {}

T_Estados.init(
  {
    CN_Id_Estado: {
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
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "T_Estados",
    tableName: "T_Estados",
    timestamps: false,
  }
);

module.exports = T_Estados;
