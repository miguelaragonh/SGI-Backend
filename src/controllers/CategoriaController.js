
const Categoria= require("../model/T_Categoria");

module.exports = {

async getCategorias(req, res) {
    let categoria = await Categoria.findAll();
    res.json(categoria);
  },

};
