
const Departamento= require("../model/T_Departamento");

module.exports = {

async getDepartamentos(req, res) {
  try {
    let Departamentos = await Departamento.findAll();
    res.json(Departamentos);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
}
  },

};
