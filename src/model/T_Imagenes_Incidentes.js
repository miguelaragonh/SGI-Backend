const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const T_Incidencias = require("./T_Incidencias");
const T_Imagenes = require("./T_Imagenes");

class T_Imagenes_Incidentes extends Model {}

T_Imagenes_Incidentes.init(
  {
    CN_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Id_Incidencia: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: T_Incidencias,
        key: "CT_Id_Incidencia",
      },
    },
    CN_Id_Imagen: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: T_Imagenes,
        key: "CN_Id_Imagen",
      },
    },
  },
  {
    sequelize,
    modelName: "T_Imagenes_Incidentes",
    tableName: "T_Imagenes_Incidentes",
    timestamps: false,
  }
);
T_Imagenes_Incidentes.T_Incidencias = T_Incidencias.belongsTo(T_Incidencias, { foreignKey: "CT_Id_Incidencia" });
T_Imagenes_Incidentes.T_Imagenes = T_Imagenes.belongsTo(T_Imagenes, { foreignKey: "CN_Id_Imagen" });

module.exports = T_Imagenes_Incidentes;
