const router = require("express").Router();
const usuario= require('../controllers/Usuario');

const middleWares= require('../middlewares/auth');
/*Crear Usuario*/
router.post("/usuarios/iniciar", usuario.iniciarSesion);

router.post("/usuarios/crear", middleWares,usuario.crearUsuario);
router.get("/usuarios", middleWares, usuario.getUsuarios);
router.get("/usuarios/:id", middleWares, usuario.getUsuario);


module.exports = router;