const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../model/Usuario");
const { where } = require("../db/config");

module.exports = {
  iniciarSesion(req, res) {
    let { CT_Usuario, CT_Contraseña } = req.body;
    Usuario.findOne({
      where: {
        CT_Usuario: CT_Usuario,
      },
    }).then((usuario) => {
        if (usuario) {
          if (bcrypt.compareSync(CT_Contraseña, usuario.CT_Contraseña)) {
            let token = jwt.sign(
              {
                usuario: usuario,
              },
              "secret",
              {
                expiresIn: '1h',
              }
            );

            res.cookie("token", token, {
              httpOnly: false,
              secure: true,
              sameSite: "none",
            });

            
            res.status(201).json({
              usuario: usuario,
              token:token
            });
            console.log('Datos correctos')

          } else {
            res.status(404).json({
              msg: "Datos erroneos",
            });
            console.log('Datos erroneos')
          }
        } else {
          res.status(404).json({
            msg: "Usuario no encontrado",
          });
        }
      })
      .catch((e) => {
        res.status(500).json(e);
      });
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
        res.status(500).json(e);
      });
  },

async getUsuarios(req, res) {
    let usuarios = await Usuario.findAll();
    res.json(usuarios);
  },

async getUsuario(req, res){
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
  
      if (usuario) {
        usuario.CT_Nombre = req.body.CT_Nombre;
        usuario.CT_Usuario = req.body.CT_Usuario;
        usuario.CT_Contraseña = bcrypt.hashSync(req.body.CT_Contraseña, 10);
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
  }
};
