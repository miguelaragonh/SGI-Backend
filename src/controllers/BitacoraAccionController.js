const T_Bitacoras_Accion = require("../model/T_Bitacoras_Accion");

module.exports = {
    crearBitacoraAccion: async (req, res) => { 
        const { CT_Codigo_Usuario, CN_Id_Pantalla, CT_Nombre_Referencia } = req.body;
        try {
            await T_Bitacoras_Accion.create({
                CT_Codigo_Usuario,
                CN_Id_Pantalla,
                CT_Nombre_Referencia,
            });
            res.status(201).json({ message: "Bitacora de accion creada" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
     }
};