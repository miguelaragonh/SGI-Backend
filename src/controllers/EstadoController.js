
const Estados = require("../model/T_Estados");

module.exports = {
  async getEstado(req, res) {
    try {
      let estado = await Estados.findOne({
        where: {
          CN_Id_Estado: req.params.id,
        },
      });
      res.json(estado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener el estado" });
    }
  },
  async getEstados(req, res) {
    try {
      let Estado = await Estados.findAll();
      res.json(Estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};
