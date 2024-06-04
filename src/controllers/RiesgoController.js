
const Riesgo= require("../model/T_Riesgo");

module.exports = {

async getRiesgos(req, res) {
    let riesgos = await Riesgo.findAll();
    res.json(riesgos);
  },

};
