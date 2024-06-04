
const Afectacion = require("../model/T_Afectacion");

module.exports = {

  async getAfectaciones(req, res) {
    try {
      let afectaciones = await Afectacion.findAll();
      res.json(afectaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};
