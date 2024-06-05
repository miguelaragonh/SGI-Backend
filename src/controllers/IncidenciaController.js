// CRUD de incidencias.

const T_Incidencias = require("../model/T_Incidencias");
const T_Crear_Incidencias = require("../model/T_Crear_Incidencias");
const T_Asignar_Incidentes = require("../model/T_Asignar_Incidentes");
const sendMail = require('../Mail/appMail');
const Usuario = require("../model/Usuario");
async function idIncidencia() {
  var count = (await T_Incidencias.count()) + 1;
  var año = new Date().getFullYear().toString();
  var cons = count.toString().padStart(6, "0");
  var cod = `${año}-${cons}`;
  console.log(cod);
  return cod;
}
async function registroIncidenteUsuario(idUsuario, idIncidencia) {
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

module.exports = {
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
  async crearIncidencia(req, res) {
    const id = await idIncidencia();
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
    registroIncidenteUsuario(req.body.Usuario, id);
  },

  async asignarIncidencia(req, res) {
    const incidenciaAsignada = T_Asignar_Incidentes.create({
      CT_Codigo_Usuario: req.body.CT_Codigo_Usuario,
      CT_Id_Incidencia: req.params.id,
    })
      .then((incidenciaAsignada) => {
        res.status(201).json({
          incidenciaAsignada,
        });
        enviarCorreo(req.body.CT_Codigo_Usuario, req.params.id);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json(e);
      }); 
  },
};
