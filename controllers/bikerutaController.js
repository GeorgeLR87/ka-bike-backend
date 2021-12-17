const Bikeruta = require('./../models/Bikeruta')

exports.create = async (req, res) => {

    // Del formulario, creamos variables y asiganamos valores
    const {
        marca,
        modelo,
        year,
        talla,
        rodada,
        color,
        tipofreno,
        transmision,
        material,
        modalidad,
        descripcion,
        precio
    } = req.body

    try {
        const newBikeruta = await Bikeruta.create({
        marca,
        modelo,
        year,
        talla,
        rodada,
        color,
        tipofreno,
        transmision,
        material,
        modalidad,
        descripcion,
        precio
        })

        // Devolver una respuesta en un formato Json
        res.json({
            msg: 'Bikeruta creada con éxito',
            data: newBikeruta
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error creando Bikeruta',
            error: error
        })        
    }
}