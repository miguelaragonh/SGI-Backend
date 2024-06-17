const sequelize = require("../db/config");
const { Model, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const T_Incidencias = require("./T_Incidencias");
const T_Diagnostico = require("./T_Diagnostico");
const T_Pantallas = require("./T_Pantallas");

class T_Bitacoras_Accion extends Model {}

T_Bitacoras_Accion.init(
  {
    CN_Id_Bitacoras_Accion: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CT_Nombre_Sistema: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    CT_Nombre_Referencia: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CN_Id_Pantalla: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: T_Pantallas,
        key: "CN_Id_Pantalla",
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
    modelName: "T_Bitacoras_Accion",
    tableName: "T_Bitacoras_Accion",
    timestamps: false,
  }
);
T_Bitacoras_Accion.Usuario = Usuario.belongsTo(Usuario, {
  foreignKey: "CT_Codigo_Usuario",
});
T_Bitacoras_Accion.T_Pantallas = T_Pantallas.belongsTo(T_Pantallas, {
  foreignKey: "CN_Id_Pantalla",
});

module.exports = T_Bitacoras_Accion;
