const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log(req.headers);

  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret", (err, decoded) => {
      if (!err) {
        next();
      } else {
        res.status(500).json({ msg: "Ocurrio un error" });
      }
    });
  } else {
    res.status(401).json({ msg: "Acceso denegado" });
  }
};
