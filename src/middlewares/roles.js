// Definimos los roles en un array
const roles = ["1", "2", "3", "4", "5"];

// Exportamos un array de middlewares, uno para cada rol
module.exports = roles.map((rol) => {
  // Cada middleware es una función que toma tres argumentos: req, res y next
  return (req, res, next) => {
    console.log(req.body.user);
    // Verificamos si el usuario está definido y si su rol coincide con el rol para este middleware
    if (req.body.rol == rol) {
      // Si el usuario tiene el rol correcto, llamamos a next() para pasar al siguiente middleware o ruta
      next();
    } else {
      // Si el usuario no tiene el rol correcto, respondemos con un estado 403 y un mensaje de "Acceso denegado"
      res.status(403).send("Acceso denegado");
    }
  };
});
