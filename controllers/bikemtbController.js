const Bikemtb = require('./../models/Bikemtb')

exports.create = async (req, res) => {

    // Del formulario, creamos variables y asiganamos valores
    const {
        marca,
        modelo,
        year,
        talla,
        rodada,
        color,
        rdelantero,
        rtrasero,
        material,
        modalidad,
        descripcion,
        precio
    } = req.body

    try {
        const newBikemtb = await Bikemtb.create({
        marca,
        modelo,
        year,
        talla,
        rodada,
        color,
        rdelantero,
        rtrasero,
        material,
        modalidad,
        descripcion,
        precio
        })

        // Devolver una respuesta en un formato Json
        res.json({
            msg: 'Bikemtb creada con éxito',
            data: newBikemtb
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error creando Bikemtb',
            error: error
        })        
    }
}

exports.readAll = async (req, res) => {
    
    try {
    
        const bikesmtb = await Bikemtb.find({})

        res.json({
            msg: 'Bikesmtb obtenidas con éxito.',
            data: bikesmtb
        })

    } catch (error) {
        
        res.status(500).json({
            msg: 'Hubo un error obteniendo los datos',
            error: error
        })
    }
}