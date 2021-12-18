// ./server/models/Admin.js

//1. Importaciones
const mongoose = require('mongoose')

// 2. Schemas
const adminSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type:String,
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
const Admin = mongoose.model('Admin', adminSchema)

//4. Exportación
module.exports = Admin