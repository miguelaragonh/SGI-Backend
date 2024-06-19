// CRUD de incidencias.

const T_Incidencias = require("../model/T_Incidencias");
const T_Diagnostico = require("../model/T_Diagnostico");
const T_Diagnostico_Incidentes = require("../model/T_Diagnostico_Incidentes");
async function registroDiagnosticoIncidente(
  idUsuario,
  idIncidencia,
  idDiagnostico
) {
  console.log(idUsuario, idIncidencia, idDiagnostico);
 T_Diagnostico_Incidentes.create({
    CT_Id_Incidencia: idIncidencia,
    CN_Id_Diagnostico: idDiagnostico,
    CT_Codigo_Usuario: idUsuario,
  });
}

module.exports = {
  async crearDiagnostico(req, res) {
    const usuario = req.body.Usuario;
    const incidencia = req.body.Incidencia;
    const diagnostico = T_Diagnostico.create({
      CF_Fecha_Hora: new Date(),
      CT_Descripcion: req.body.CT_Descripcion,
      CN_Tiempo_Solucion: req.body.CN_Tiempo_Solucion,
      CT_Compra: req.body.CT_Compra,
    })
      .then((diagnostico) => {
        if (diagnostico.CT_Compra === "Si") {
         T_Incidencias.update(
            { CN_Id_Estado: 5 },
            { where: { CT_Id_Incidencia: incidencia } }
          );
        }else{
          T_Incidencias.update(
            { CN_Id_Estado: 4 },
            { where: { CT_Id_Incidencia: incidencia } }
          );
        }
        registroDiagnosticoIncidente(usuario, incidencia, diagnostico.CN_Id_Diagnostico);
        res.status(201).json({
          diagnostico
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json(e);
      });
  },
  async getDiagnosticoIncidente(req, res) {
    try {
      let resultados = await T_Diagnostico_Incidentes.findAll({
        where: { CT_Id_Incidencia: req.params.id },
        include: [{
          model: T_Diagnostico,
          as: 'Diagnostico',
          attributes: ['CT_Descripcion', 'CN_Tiempo_Solucion', 'CT_Compra'],
        }],
      });
      
      // Extrae solo la información de Diagnostico
      let diagnosticos = resultados.map(resultado => resultado.Diagnostico);
      res.json(diagnosticos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener las incidencias" });
    }
  },
};
