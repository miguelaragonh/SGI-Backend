const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const T_Estados = require("./T_Estados");
const T_Prioridad = require("./T_Prioridad");
const T_Riesgo = require("./T_Riesgo");
const T_Afectacion = require("./T_Afectacion");
const T_Categoria = require("./T_Categoria");

class T_Incidencias extends Model {}

T_Incidencias.init(
  {
    CT_Id_Incidencia: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CF_Fecha_Hora: {
      allowNull: false,
      type: DataTypes.DATE,

    },
    CT_Titulo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Lugar: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CN_Costos: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    CN_Duracion: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    CN_Id_Prioridad: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Prioridad,
        key: "CN_Id_Prioridad",
      },
    },
    CN_Id_Riesgo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Riesgo,
        key: "CN_Id_Riesgo",
      },
    },
    CN_Id_Afectacion: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Afectacion,
        key: "CN_Id_Afectacion",
      },
    },
    CN_Id_Categoria: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Categoria,
        key: "CN_Id_Categoria",
      },
    },
    CN_Id_Estado: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Estados,
        key: "CN_Id_Estado",
      },
    },
    justificacionCierre: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "T_Incidencias",
    tableName: "T_Incidencias",
    timestamps: false,
  }
);

T_Incidencias.T_Prioridad = T_Prioridad.belongsTo(T_Prioridad, {foreignKey: "CN_Id_Prioridad",});
T_Incidencias.T_Riesgo = T_Riesgo.belongsTo(T_Riesgo, {foreignKey: "CN_Id_Riesgo",});
T_Incidencias.T_Afectacion = T_Afectacion.belongsTo(T_Afectacion, {foreignKey: "CN_Id_Afectacion",});
T_Incidencias.T_Categoria = T_Categoria.belongsTo(T_Categoria, {foreignKey: "CN_Id_Categoria",});
T_Incidencias.T_Estados = T_Estados.belongsTo(T_Estados, {foreignKey: "CN_Id_Estado",})
;

module.exports = T_Incidencias;
