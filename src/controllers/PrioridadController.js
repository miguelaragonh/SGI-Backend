
const Prioridad= require("../model/T_Prioridad");

module.exports = {

async getPrioridades(req, res) {
    let Prioridades = await Prioridad.findAll();
    res.json(Prioridades);
  },

};
