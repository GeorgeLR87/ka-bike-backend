// ./server/models/Bikeruta.js

//1. Importaciones
const mongoose = require('mongoose')

//2. Schema
const bikerutaSchema = mongoose.Schema({
    marca:{
        type: String,
        required: true
    },
    modelo:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    talla:{
        type: String,
        required: true
    },
    rodada:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    tipofreno:{
        type: Number,
        required: true
    },
    transmision:{
        type: Number,
        required: true
    },
    material:{
        type: String,
        required: true
    },
    modalidad:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    }
})

//3.Modelo
const Bikeruta = mongoose.model('Bikeruta', bikerutaSchema)


//4. Exportación
module.exports = Bikeruta