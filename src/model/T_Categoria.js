
const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");

class T_Categoria extends Model {}

T_Categoria.init(
  {
    CN_Id_Categoria: {
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
    modelName: "T_Categoria",
    tableName: "T_Categoria",
    timestamps: false,
  }
);

module.exports = T_Categoria;
