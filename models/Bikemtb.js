// ./server/models/Bikemtb.js

//1. Importaciones
const mongoose = require('mongoose')

//2. Schema
const bikemtbSchema = mongoose.Schema({
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
    rdelantero:{
        type: Number,
        required: true
    },
    rtrasero:{
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
    },
    imagen:{
        type: String,
        require:true
    }

})

//3.Modelo
const Bikemtb = mongoose.model('Bikemtb', bikemtbSchema)


//4. Exportación
module.exports = Bikemtb