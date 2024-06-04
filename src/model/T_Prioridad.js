const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Prioridad extends Model {}

T_Prioridad.init(
  {
    CN_Id_Prioridad: {
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
    modelName: "T_Prioridad",
    tableName: "T_Prioridad",
    timestamps: false,
  }
);

module.exports = T_Prioridad;