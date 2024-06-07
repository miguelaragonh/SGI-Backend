const sequelize = require('../db/config')
const { Model, DataTypes } = require("sequelize");
const T_Departamento = require('./T_Departamento'); 

class Usuario extends Model {}

Usuario.init(
  {
    CT_Codigo_Usuario: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
    },
    CT_Nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Contraseña: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CT_Usuario: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    CN_Numero_Telefonico: {
      type: DataTypes.INTEGER,
    },
    CT_Puesto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CN_Id_Departamento: {
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: T_Departamento, 
        key: 'CN_Id_Depa' 
      }
    }
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "Usuarios",
  }
);

Usuario.T_Departamento = T_Departamento.belongsTo(T_Departamento, { foreignKey: "CN_Id_Departamento" });

module.exports = Usuario;
