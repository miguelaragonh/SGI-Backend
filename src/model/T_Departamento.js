const sequelize = require('../db/config')
const { Model, DataTypes } = require("sequelize");

class T_Departamento extends Model {}

T_Departamento.init(
  {
    CN_Id_Departamento: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    CT_Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "T_Departamento",
    tableName: "T_Departamento",
    timestamps: false,
  }
);

module.exports = T_Departamento;
