// CRUD de incidencias.

const T_Incidencias = require("../model/T_Incidencias");
const T_Crear_Incidencias = require("../model/T_Crear_Incidencias");
async function idIncidencia() {
    var count = await T_Incidencias.count() + 1;
    var año = new Date().getFullYear().toString();
    var cons = count.toString().padStart(6, '0');
    var cod = `${año}-${cons}`;
    console.log(cod);
    return cod;
}
async function registroIncidenteUsuario(idUsuario, idIncidencia) {
        T_Crear_Incidencias.create({
            CT_Id_Incidencia:idIncidencia,
            CT_Codigo_Usuario:idUsuario
            })
    };
module.exports = {
    async getIncidencias(req, res) {
        try {
            let incidencias = await T_Incidencias.findAll();
            res.json(incidencias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener las incidencias' });
        }
    },
    async crearInicidencia(req, res) {
    const id = await idIncidencia();
    const incidencia = T_Incidencias.create({
        CT_Id_Incidencia:id,
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
        registroIncidenteUsuario(req.body.Usuario, id)
    },
};
