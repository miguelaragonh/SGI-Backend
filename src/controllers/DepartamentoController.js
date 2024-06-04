
const Departamento= require("../model/T_Departamento");

module.exports = {

async getDepartamentos(req, res) {
    let Departamentos = await Departamento.findAll();
    res.json(Departamentos);
  },

};
