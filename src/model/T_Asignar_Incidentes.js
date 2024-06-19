const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const T_Incidencias = require("./T_Incidencias");

class T_Asignar_Incidentes extends Model {}

T_Asignar_Incidentes.init(
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
    modelName: "T_Asignar_Incidentes",
    tableName: "T_Asignar_Incidentes",
    timestamps: false,
  }
);

T_Asignar_Incidentes.T_Incidencias = T_Incidencias.belongsTo(T_Incidencias, { foreignKey: "CT_Id_Incidencia" });
T_Asignar_Incidentes.Usuario = Usuario.belongsTo(Usuario, { foreignKey: "CT_Codigo_Usuario" });
T_Incidencias.hasMany(T_Asignar_Incidentes, { foreignKey: "CT_Id_Incidencia" });
module.exports = T_Asignar_Incidentes;
