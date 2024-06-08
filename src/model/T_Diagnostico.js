const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Diagnostico extends Model {}

T_Diagnostico.init(
  {
    CN_Id_Diagnostico: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CF_Fecha_Hora: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    CT_Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CN_Tiempo_Solucion:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    CT_Compra: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "T_Diagnostico",
    tableName: "T_Diagnostico",
    timestamps: false,
  }
);


module.exports = T_Diagnostico;