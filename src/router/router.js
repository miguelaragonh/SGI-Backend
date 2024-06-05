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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Afectacioness""""""""""""""""" */
router.get("/afectaciones", afectacionController.getAfectaciones);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Riesgos""""""""""""""""" */
router.get("/riesgos", riesgoController.getRiesgos);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Prioridad""""""""""""""""" */
router.get("/prioridades", prioridadController.getPrioridades);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar Estados""""""""""""""""" */
router.get("/estados", estadoController.getEstados);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/


/*"""""""""""""""""Gestionar Departamentos""""""""""""""""" */
router.get("/departamentos", departamentoController.getDepartamentos);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/

/*"""""""""""""""""Gestionar UsuarioRol""""""""""""""""" */
router.get("/rol/asignados", UsuarioRolController.getRolesAsignados);
router.post("/rol/asignar", UsuarioRolController.asignarRol);
router.post("/rol/asignado/:id", UsuarioRolController.editarRolAsignado);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/


/*"""""""""""""""""Gestionar Incidencias""""""""""""""""" */
router.get("/incidencia", IncidenciaController.getIncidencias);
router.post("/incidencia/crear", IncidenciaController.crearIncidencia);
router.post("/incidencia/asignar/:id", IncidenciaController.asignarIncidencia);
/*'''''''''''''''''''''''''''''''''''''''''''''''''''*/
module.exports = router;
