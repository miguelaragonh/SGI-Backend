const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../model/Usuario");
const { where } = require("../db/config");
const T_Usuario_Rol = require("../model/T_Usuario_Rol");

module.exports = {
  async iniciarSesion(req, res) {
    let { CT_Usuario, CT_Contraseña } = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: {
                CT_Usuario: CT_Usuario,
            },
        });

        if (usuario) {
            if (bcrypt.compareSync(CT_Contraseña, usuario.CT_Contraseña)) {
                const rol = await T_Usuario_Rol.findAll({
                    where: { CT_Codigo_Usuario: usuario.CT_Codigo_Usuario },
                });
                let token = jwt.sign({
                    usuario: usuario,
                    rol: rol
                }, "secret");

                res.status(201).json({
                    usuario: usuario,
                    rol: rol,
                    token: token,
                });
                console.log("Datos correctos");
            } else {
                res.status(404).json({
                    msg: "Datos erroneos",
                });
                console.log("Datos erroneos");
            }
        } else {
            res.status(404).json({
                msg: "Usuario no encontrado",
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
},
  crearUsuario(req, res) {
    Usuario.create({
      CT_Codigo_Usuario: req.body.CT_Codigo_Usuario,
      CT_Nombre: req.body.CT_Nombre,
      CT_Usuario: req.body.CT_Usuario,
      CT_Contraseña: bcrypt.hashSync(req.body.CT_Contraseña, 10),
      CN_Numero_Telefonico: req.body.CN_Numero_Telefonico,
      CT_Puesto: req.body.CT_Puesto,
      CN_Id_Departamento: req.body.CN_Id_Departamento,
    })
      .then((usuario) => {
        /*let token = jwt.sign(
            { 
                usuario: usuario
            }, 
            'secret', 
            { 
                expiresIn: 30
            });*/

        res.status(201).json({
          usuario,
          //token:token
        });
      })
      .catch((e) => {
        console.log(e);
        if (e) {
          res.status(500).json({
            msg: "cedula o correo existente",
          });
        }
        //res.status(500).json(e);
      });
  },

  async getUsuarios(req, res) {
    let usuarios = await Usuario.findAll({
      include: [
        {
          association: Usuario.T_Departamento,
          attributes: ["CT_Descripcion"],
        },
      ],
    });
    res.json(usuarios);
  },

  async getUsuario(req, res) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          CT_Codigo_Usuario: req.params.id,
        },
      });

      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async editarUsuario(req, res) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          CT_Codigo_Usuario: req.params.id,
        },
      });
      console.log("Body");
      console.log(req.body);
      if (usuario) {
        usuario.CT_Nombre = req.body.CT_Nombre;
        usuario.CT_Usuario = req.body.CT_Usuario;
        usuario.CN_Numero_Telefonico = req.body.CN_Numero_Telefonico;
        usuario.CT_Puesto = req.body.CT_Puesto;
        usuario.CN_Id_Departamento = req.body.CN_Id_Departamento;

        await usuario.save();

        res.json(usuario);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async cambiarContraseña(req, res) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          CT_Codigo_Usuario: req.params.id,
        },
      });
      if (usuario) {
        usuario.CT_Contraseña = bcrypt.hashSync(req.body.CT_Contraseña, 10);
        await usuario.save();
        res.status(200).json({ message: "Contraseña cambiada correctamente"});
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
