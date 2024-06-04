const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const T_Incidencias = require("./T_Incidencias");

class T_Crear_Incidencias extends Model {}

T_Crear_Incidencias.init(
  {
    CN_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Codigo_Usuario: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: "CT_Codigo_Usuario",
      },
    },
    CT_Id_Incidencia: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: T_Incidencias,
        key: "CT_Id_Incidencia",
      },
    },
  },
  {
    sequelize,
    modelName: "T_Crear_Incidencias",
    tableName: "T_Crear_Incidencias",
    timestamps: false,
  }
);
T_Crear_Incidencias.T_Incidencias = T_Incidencias.belongsTo(T_Incidencias, { foreignKey: "CT_Id_Incidencia" });
T_Crear_Incidencias.Usuario = Usuario.belongsTo(Usuario, { foreignKey: "CT_Codigo_Usuario" });

module.exports = T_Crear_Incidencias;
