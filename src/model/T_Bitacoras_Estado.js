const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const T_Incidencias = require("./T_Incidencias");
const T_Diagnostico = require("./T_Diagnostico");
const T_Pantallas = require("./T_Pantallas");
const T_Estados = require("./T_Estados");

class T_Bitacoras_Estado extends Model {}

T_Bitacoras_Estado.init(
  {
    CN_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CN_Id_Estado: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Estados,
        key: "CN_Id_Estado",
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
    CN_Id_Nuevo_Estado: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: T_Estados,
        key: "CN_Id_Estado",
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
    modelName: "T_Bitacoras_Estado",
    tableName: "T_Bitacoras_Estado",
    timestamps: false,
  }
);
T_Bitacoras_Estado.Usuario = Usuario.belongsTo(Usuario, {
  foreignKey: "CT_Codigo_Usuario",
});
T_Bitacoras_Estado.T_Incidencias = T_Incidencias.belongsTo(T_Incidencias, {
  foreignKey: "CT_Id_Incidencia",
});

T_Bitacoras_Estado.T_Estados = T_Estados.belongsTo(T_Estados, {
  foreignKey: "CN_Id_Estado",
});

module.exports = T_Bitacoras_Estado;
