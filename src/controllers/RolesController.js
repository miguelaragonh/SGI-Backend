
const Rol = require("../model/T_Roles");

module.exports = {

async getRoles(req, res) {
    let roles = await Rol.findAll();
    res.json(roles);
  },

};
