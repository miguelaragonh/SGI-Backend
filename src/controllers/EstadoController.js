
const Estados = require("../model/T_Estados");

module.exports = {

  async getEstados(req, res) {
    try {
      let Estado = await Estados.findAll();
      res.json(Estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};
