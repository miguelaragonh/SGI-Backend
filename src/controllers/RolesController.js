const Rol = require("../model/T_Roles");
const T_Usuario_Rol = require("../model/T_Usuario_Rol");

module.exports = {
  async getRoles(req, res) {
    let roles = await Rol.findAll();
    res.json(roles);
  },
  async getRolUsuario(req, res) {
    let roles = await T_Usuario_Rol.findAll({
      attributes: ["CN_Id_Rol"],

      where: {
        CT_Codigo_Usuario: req.params.id,
      },
    });
    res.json(roles);
  },

  async gestionarRolUsuario(req, res) {

    let roles = await T_Usuario_Rol.findAll({
      where: {
        CT_Codigo_Usuario: req.params.id,
      },
    });

    if (roles.length > 0) {
      roles.forEach(async (rol) => {
        await rol.destroy();
      });
    }

    req.body.roles.forEach(async (rol) => {
      await T_Usuario_Rol.create({
        CT_Codigo_Usuario: req.params.id,
        CN_Id_Rol: rol,
      });
    });

    res.json({
      message: "Roles asignados correctamente",
    });
  },
};
