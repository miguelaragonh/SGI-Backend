//const T_Roles = require("../model/T_Roles");
//const Usuario = require("../model/Usuario");
const RolesAsignados = require("../model/T_Usuario_Rol");

module.exports = {
  async getRolesAsignados(req, res) {
    let rolesAsignados = await RolesAsignados.findAll({
      include: [
        {
          association: RolesAsignados.T_Roles,
          attributes: ["CT_Descripcion"],
        },
        {
          association: RolesAsignados.Usuario,
          attributes: ["CT_Nombre"],
        },
      ],
    });
    res.json(rolesAsignados);
  },
  async asignarRol(req, res) {
    RolesAsignados.create({
      CT_Codigo_Usuario: req.body.CT_Codigo_Usuario,
      CN_Id_Rol: req.body.CN_Id_Rol,
    })
      .then((rolesAsignados) => {
        res.status(201).json({
          rolesAsignados: rolesAsignados,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json(e);
      });
  },
  async editarRolAsignado(req, res) {
    try {
      const RolAsignado = await RolesAsignados.findOne({
        where: {
          CN_Id: req.params.id,
        },
      });

      if (RolAsignado) {
        RolAsignado.CT_Codigo_Usuario = req.body.CT_Codigo_Usuario;
        RolAsignado.CN_Id_Rol = req.body.CN_Id_Rol;

        await RolAsignado.save();

        res.json(RolAsignado);
      } else {
        res.status(404).json({ message: "Rol Asignado no encontrado" });
      }
    } catch (error) {
      console.error("Error al editar el Rol Asignado:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};