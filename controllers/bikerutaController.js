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

exports.readAll = async (req, res) => {

    try {

        const bikesruta = await Bikeruta.find({})

        res.json({
            msg: 'Bikesruta obtenidas con éxito.',
            data: bikesruta
        })
        
    } catch (error) {

        res.status(500).json({
            msg: 'Hubo un error obteniendo los datos',
            error: error
        })
    }
}

exports.readOne = async (req, res) => {
    const { id } = req.params

    try {

        const bikeruta = await Bikeruta.findById(id)

        res.json({
            msg: 'Bikeruta obtenida con éxito.',
            data: bikeruta
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error obteniendo los datos.',
            error: error
        })
        
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params;
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
      precio,
    } = req.body;
  
    try {
      const updatedBikeruta = await Bikeruta.findByIdAndUpdate(
          id, 
          {
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
           precio,
          },
          {new: true}
      )
      res.json({
          msg: 'Bikeruta actualizada con éxito.',
          data: updatedBikeruta
      })
  
    } catch (error) {
  
      res.status(500).json({
          msg: 'hubo un error con la actualización de Bikeruta',
          error: error
      })
    }
  };