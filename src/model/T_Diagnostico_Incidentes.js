const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const T_Incidencias = require("./T_Incidencias");
const T_Diagnostico = require("./T_Diagnostico");

class T_Diagnostico_Incidentes extends Model {}

T_Diagnostico_Incidentes.init(
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
    CN_Id_Diagnostico: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: T_Diagnostico,
        key: "CT_Codigo_Usuario",
      },
    },
    CT_Codigo_Usuario: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: "CT_Codigo_Usuario",
      },
    },
  },
  {
    sequelize,
    modelName: "T_Diagnostico_Incidentes",
    tableName: "T_Diagnostico_Incidentes",
    timestamps: false,
  }
);
T_Diagnostico_Incidentes.T_Incidencias = T_Incidencias.belongsTo(
  T_Incidencias,
  { foreignKey: "CT_Id_Incidencia" }
);
T_Diagnostico_Incidentes.Usuario = Usuario.belongsTo(Usuario, {
  foreignKey: "CT_Codigo_Usuario",
});
// Asociación con alias
T_Diagnostico_Incidentes.belongsTo(T_Diagnostico, {
  foreignKey: "CN_Id_Diagnostico",
  as: "Diagnostico",
});

module.exports = T_Diagnostico_Incidentes;
