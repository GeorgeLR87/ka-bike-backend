const Bikemtb = require("./../models/Bikemtb");

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
    precio,
    imagen,

  } = req.body;

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
      precio,
      imagen,
    });

    // Devolver una respuesta en un formato Json
    res.json({
      msg: "Bikemtb creada con éxito",
      data: newBikemtb,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error creando Bikemtb",
      error: error,
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const bikesmtb = await Bikemtb.find({});

    res.json({
      msg: "Bikesmtb obtenidas con éxito.",
      data: bikesmtb,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
      error: error,
    });
  }
};

exports.readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const bikemtb = await Bikemtb.findById(id);

    res.json({
      msg: "Bikemtb obtenida con éxito.",
      data: bikemtb,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo",
    });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
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
    precio,
    imagen,
  } = req.body;

  try {
    const updatedBikemtb = await Bikemtb.findByIdAndUpdate(
        id, 
        {
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
         precio,
         imagen,
        },
        {new: true}
    )
    res.json({
        msg: 'Bikemtb actualizada con éxito.',
        data: updatedBikemtb
    })

  } catch (error) {

    res.status(500).json({
        msg: 'hubo un error con la actualización de Bikemtb',
        error: error
    })
  }
};

exports.delete = async (req, res) => {
    const { id } = req.params

    try {

        const deletedBikemtb = await Bikemtb.findByIdAndRemove({_id: id})

        res.json({
            msg: 'Bikemtb borrada con éxito.',
            data: deletedBikemtb
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando Bikemtb",
            error:error
        })
        
    }
}
