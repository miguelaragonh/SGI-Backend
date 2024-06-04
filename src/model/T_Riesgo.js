const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Riesgo extends Model {}

T_Riesgo.init(
  {
    CN_Id_Riesgo: {
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
    modelName: "T_Riesgo",
    tableName: "T_Riesgo",
    timestamps: false,
  }
);

module.exports = T_Riesgo;