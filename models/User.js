// ./server/models/User.js

//1. Importaciones
const mongoose = require('mongoose')

// 2. Schemas
const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type:String,
        default: ""
    },
    pais: {
        type: String,
        default: ""        
    },
    estado: {
        type: String,
        default: ""       
    },
    direccion: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

// 3. Modelos
const User = mongoose.model('User', userSchema)

//4. Exportación
module.exports = User