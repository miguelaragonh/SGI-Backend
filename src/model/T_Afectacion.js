
const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Afectacion extends Model {}

T_Afectacion.init(
  {
    CN_Id_Afectacion: {
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
    modelName: "T_Afectacion",
    tableName: "T_Afectacion",
    timestamps: false,
  }
);

module.exports = T_Afectacion;
