const router = require("express").Router();
const auth = require("../middlewares/auth");
const authRol = require("../middlewares/roles");
const usuarioController = require("../controllers/UsuarioController");
const rolController = require("../controllers/RolesController");
const afectacionController = require("../controllers/AfectacionController");
const riesgoController = require("../controllers/RiesgoController");
const prioridadController = require("../controllers/PrioridadController");
const estadoController = require("../controllers/EstadoController");
const departamentoController = require("../controllers/DepartamentoController");
const UsuarioRolController = require("../controllers/UsuarioRolController");
const IncidenciaController = require("../controllers/IncidenciaController");
const categoriaController = require("../controllers/CategoriaController");
const DiagnosticosController = require("../controllers/DiagnosticosController");
const BitacoraController = require("../controllers/BitacoraController");

/*Crear Usuario*/

router.post("/usuarios/iniciar", usuarioController.iniciarSesion);

/*"""""""""""""""""Gestionar Usuarios""""""""""""""""" */
router.post("/usuarios/crear", usuarioController.crearUsuario);
router.post("/usuarios/editar/:id", usuarioController.editarUsuario);
router.get("/usuarios", usuarioController.getUsuarios);
router.get("/usuarios/:id", usuarioController.getUsuario);
router.put("/usuarios/contrasena/:id", usuarioController.cambiarContraseña);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''' */

/*"""""""""""""""""Gestionar Roles""""""""""""""""" */
router.get("/roles", rolController.getRoles);
router.get("/roles/:id", rolController.getRolUsuario);
router.post("/roles/:id", rolController.gestionarRolUsuario);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Afectacioness""""""""""""""""" */
router.get("/afectaciones", afectacionController.getAfectaciones);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Categorias""""""""""""""""" */
router.get("/categorias", categoriaController.getCategorias);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Riesgos""""""""""""""""" */
router.get("/riesgos", riesgoController.getRiesgos);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Prioridad""""""""""""""""" */
router.get("/prioridades", prioridadController.getPrioridades);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Estados""""""""""""""""" */
router.get("/estados", estadoController.getEstados);
router.get("/estados/:id", estadoController.getEstado);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/


/*"""""""""""""""""Gestionar Departamentos""""""""""""""""" */
router.get("/departamentos", departamentoController.getDepartamentos);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar UsuarioRol""""""""""""""""" */
router.get("/rol/asignados", UsuarioRolController.getRolesAsignados);
router.get("/tecnicos", UsuarioRolController.getUsuarioTecnico);
router.get("/tecnicos/:id", IncidenciaController.getTecnicosAsignados);
router.post("/rol/asignar", UsuarioRolController.asignarRol);
router.post("/rol/asignado/:id", UsuarioRolController.editarRolAsignado);

/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/



/*"""""""""""""""""BitacoraS""""""""""""""""" */
router.post("/bitacora1", BitacoraController.crearBitacoraAccion);
router.post("/bitacora2", BitacoraController.crearBitacoraEstado);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/
/*"""""""""""""""""Gestionar Incidencias""""""""""""""""" */
router.get("/incidencia", IncidenciaController.getIncidencias);
router.get("/incidenciaregistradas/:id", IncidenciaController.getIncidenciasRegistradas);
router.get("/incidencia-asignadas/:id", IncidenciaController.getIncidenciasAsignadasUsuario);
router.get("/incidencia/imagen/:id", IncidenciaController.getImagen);
router.get("/incidencias/:id", IncidenciaController.getIncidenciasUsuario);
router.post("/incidencia/crear", IncidenciaController.crearIncidencia);
router.post("/incidencia/crear/diagnostico", DiagnosticosController.crearDiagnostico);
router.get("/incidencia/diagnostico/:id", DiagnosticosController.getDiagnosticoIncidente);
router.put("/incidencia/editar/:id", IncidenciaController.actualizarIncidencia);
router.put("/incidencia/supervizar/:id", IncidenciaController.supervizarIncidencia);
router.post("/incidencia/asignar/:id", IncidenciaController.asignarIncidencia);
router.get("/reportes1/:id/:estado", IncidenciaController.reporteCargasTrabajo);

/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/
module.exports = router;
