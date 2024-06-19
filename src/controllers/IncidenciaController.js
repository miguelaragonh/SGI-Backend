// CRUD de incidencias.
const { Op, where } = require("sequelize");
const T_Incidencias = require("../model/T_Incidencias");
const T_Crear_Incidencias = require("../model/T_Crear_Incidencias");
const T_Asignar_Incidentes = require("../model/T_Asignar_Incidentes");
const T_Imagenes = require("../model/T_Imagenes");
const T_Imagenes_Incidentes = require("../model/T_Imagenes_Incidentes");
const sendMail = require("../Mail/appMail");
const Usuario = require("../model/Usuario");
const T_Bitacoras_Estado = require("../model/T_Bitacoras_Estado");
const { Sequelize } = require("../db/config");

async function idIncidencia() {
  var count = (await T_Incidencias.count()) + 1;
  var año = new Date().getFullYear().toString();
  var cons = count.toString().padStart(6, "0");
  var cod = `${año}-${cons}`;
  console.log(cod);
  return cod;
}
async function registroIncidenteUsuario(idUsuario, idIncidencia) {
  console.log(idUsuario, idIncidencia);
  T_Crear_Incidencias.create({
    CT_Id_Incidencia: idIncidencia,
    CT_Codigo_Usuario: idUsuario,
  });
}

async function enviarCorreo(idUsuario, idIncidencia) {
  const usuario = await Usuario.findOne({
    where: {
      CT_Codigo_Usuario: idUsuario,
    },
  });
  const incidencia = await T_Incidencias.findOne({
    where: {
      CT_Id_Incidencia: idIncidencia,
    },
  });
  const correo = usuario.CT_Usuario;
  const asunto = `Incidencia asignada`;
  const mensaje = `Estimad(a) ${usuario.CT_Nombre}, se le ha asignado una incidencia con el código: ${idIncidencia}, con el título: ${incidencia.CT_Titulo} y la descripción: ${incidencia.CT_Descripcion}`;
  const html = `<b>${mensaje}</b>`;

  sendMail(correo, asunto, mensaje, html);
  console.log(correo);
}

async function guardarImagen(id, img) {
  const imagen = T_Imagenes.create({
    CI_imagen: img,
  })
    .then((imagen) => {
      const relacion = T_Imagenes_Incidentes.create({
        CT_Id_Incidencia: id,
        CN_Id_Imagen: imagen.CN_Id_Imagen,
      })
        .then((relacion) => {
          console.log("imagen");
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
}

module.exports = {
  async getImagen(req, res) {
    try {
      let imagenes = await T_Imagenes_Incidentes.findAll({
        where: {
          CT_Id_Incidencia: req.params.id,
        },
        include: [
          {
            association: T_Imagenes_Incidentes.T_Imagenes,
          },
        ],
      });
      // Mapear el resultado para extraer solo CI_imagen
      let ciImagenes = imagenes.map((imagen) => imagen.T_Imagene.CI_imagen);
      res.json(ciImagenes[0]);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las incidencias" });
    }
  },

  async getIncidenciasUsuario(req, res) {
    try {
      let incidencias = await T_Crear_Incidencias.findAll({
        where: {
          CT_Codigo_Usuario: req.params.id,
        },
        include: [
          {
            association: T_Crear_Incidencias.T_Incidencias,
          },
        ],
      });
      let tIncidencias = incidencias.map(
        (incidencia) => incidencia.T_Incidencia
      );

      res.json(tIncidencias);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las incidencias" });
    }
  },

  async getIncidenciasAsignadasUsuario(req, res) {
    try {
      let incidencias = await T_Asignar_Incidentes.findAll({
        where: {
          CT_Codigo_Usuario: req.params.id,
        },
        include: [
          {
            association: T_Crear_Incidencias.T_Incidencias,
          },
        ],
      });
      let tIncidencias = incidencias.map(
        (incidencia) => incidencia.T_Incidencia
      );

      res.json(tIncidencias);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las incidencias" });
    }
  },

  async getIncidencias(req, res) {
    try {
      let incidencias = await T_Incidencias.findAll();
      res.json(incidencias);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las incidencias" });
    }
  },

  async getIncidenciasRegistradas(req, res) {
    try {
      if (req.params.id == 0) {
        let incidencias = await T_Incidencias.findAll({
          where: {
            [Op.or]: [{ CN_Id_Estado: 4 }, { CN_Id_Estado: 5 }], // Usa el operador or correctamente
          },
        });
        res.json(incidencias);
      } else {
        let incidencias = await T_Incidencias.findAll({
          where: {
            CN_Id_Estado: req.params.id,
          },
        });
        res.json(incidencias);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las incidencias" });
    }
  },
  async crearIncidencia(req, res) {
    const id = await idIncidencia();
    const usuario = req.body.Usuario;
    const img = req.body.img;
    console.log(img);
    const incidencia = T_Incidencias.create({
      CT_Id_Incidencia: id,
      CF_Fecha_Hora: new Date(),
      CT_Titulo: req.body.CT_Titulo,
      CT_Descripcion: req.body.CT_Descripcion,
      CT_Lugar: req.body.CT_Lugar,
      CN_Id_Estado: 1,
    })
      .then((incidencia) => {
        res.status(201).json({
          incidencia,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json(e);
      });
    registroIncidenteUsuario(usuario, id);
    guardarImagen(id, img);
    await T_Bitacoras_Estado.create({
      CT_Codigo_Usuario: usuario,
      CN_Id_Estado: 0,
      CN_Id_Nuevo_Estado: 1,
      CT_Id_Incidencia: id,
    });
  },
  async actualizarIncidencia(req, res) {
    try {
      const incidencia = await T_Incidencias.findOne({
        where: {
          CT_Id_Incidencia: req.params.id,
        },
      });
      console.log(incidencia);
      if (incidencia) {
        incidencia.CN_Costos = req.body.CN_Costos;
        incidencia.CN_Duracion = req.body.CN_Duracion;
        incidencia.CN_Id_Prioridad = req.body.CN_Id_Prioridad;
        incidencia.CN_Id_Riesgo = req.body.CN_Id_Riesgo;
        incidencia.CN_Id_Afectacion = req.body.CN_Id_Afectacion;
        incidencia.CN_Id_Categoria = req.body.CN_Id_Categoria;
        incidencia.CN_Id_Estado = req.body.CN_Id_Estado;

        await incidencia.save();

        res.json(incidencia);
      } else {
        res.status(404).json({ message: "Incidencia no encontrada" });
      }
    } catch (error) {
      console.error("Error al actualizar la incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async supervizarIncidencia(req, res) {
    try {
      const incidencia = await T_Incidencias.findOne({
        where: {
          CT_Id_Incidencia: req.params.id,
        },
      });
      console.log(incidencia);
      if (incidencia) {
        incidencia.CN_Id_Estado = req.body.CN_Id_Estado;
        incidencia.justificacionCierre = req.body.justificacionCierre;
        await incidencia.save();

        res.json(incidencia);
      } else {
        res.status(404).json({ message: "Incidencia no encontrada" });
      }
    } catch (error) {
      console.error("Error al actualizar la incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async asignarIncidencia(req, res) {
    req.body.CT_Codigo_Usuario.forEach(async (usuario) => {
      await T_Asignar_Incidentes.create({
        CT_Codigo_Usuario: usuario,
        CT_Id_Incidencia: req.params.id,
      })
        .then(() => {
          enviarCorreo(usuario, req.params.id);
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json(e);
        });
    });
    res.status(200).json({ message: "Incidencia asignada correctamente" });
  },

  async getTecnicosAsignados(req, res) {
    try {
      let tecnicos = await T_Asignar_Incidentes.findAll({
        attributes: ["CT_Codigo_Usuario"],
        where: {
          CT_Id_Incidencia: req.params.id,
        },
      });
      // Transforma el resultado para obtener solo los valores de CT_Codigo_Usuario
      const codigosUsuarios = tecnicos.map(
        (tecnico) => tecnico.CT_Codigo_Usuario
      );
      res.json(codigosUsuarios);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener los técnicos asignados" });
    }
  },

  async reporteCargasTrabajo(req, res) {
    if (req.params.estado == 1) {
      try {
        let tecnicos = await T_Asignar_Incidentes.findAll({
          where: {
            CT_Codigo_Usuario: req.params.id,
          },
          include: [
            {
              where: {
                CN_Id_Estado: {
                  [Sequelize.Op.ne]: 9, // Utiliza Sequelize.Op.ne para "no igual"
                },
              },
              association: T_Asignar_Incidentes.T_Incidencias,
              attributes: ["CT_Id_Incidencia"],
            },
          ],
        });

        let reporte = tecnicos.reduce((acc, tecnico) => {
          let tecnicoExistente = acc.find(
            (t) => t.CT_Codigo_Usuario === tecnico.CT_Codigo_Usuario
          );
          if (tecnicoExistente) {
            tecnicoExistente.CN_Cantidad_Incidencias++;
          } else {
            acc.push({
              CT_Codigo_Usuario: tecnico.CT_Codigo_Usuario,
              CN_Cantidad_Incidencias: 1,
            });
          }
          return acc;
        }, []);

        res.json(reporte);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Hubo un error al obtener los técnicos asignados" });
      }
    }else{
      try {
        let tecnicos = await T_Asignar_Incidentes.findAll({
          where: {
            CT_Codigo_Usuario: req.params.id,
          },

          include: [
            {
              where: {
                CN_Id_Estado:  9,
              },
              association: T_Asignar_Incidentes.T_Incidencias,
              attributes: ["CT_Id_Incidencia"],
            },
          ],
        });

        let reporte = tecnicos.reduce((acc, tecnico) => {
          let tecnicoExistente = acc.find(
            (t) => t.CT_Codigo_Usuario === tecnico.CT_Codigo_Usuario
          );
          if (tecnicoExistente) {
            tecnicoExistente.CN_Cantidad_Incidencias++;
          } else {
            acc.push({
              CT_Codigo_Usuario: tecnico.CT_Codigo_Usuario,
              CN_Cantidad_Incidencias: 1,
            });
          }
          return acc;
        }, []);

        res.json(reporte);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Hubo un error al obtener los técnicos asignados" });
      }
    }
  },
};
/*

*/
