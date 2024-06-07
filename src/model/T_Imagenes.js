
const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Imagenes extends Model {}

T_Imagenes.init(
  {
    CN_Id_Imagen: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CI_imagen: {
      allowNull: false,
      type: DataTypes.BLOB,
    }
  },
  {
    sequelize,
    modelName: "T_Imagenes",
    tableName: "T_Imagenes",
    timestamps: false,
  }
);

module.exports = T_Imagenes;
