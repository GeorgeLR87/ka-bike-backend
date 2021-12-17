// ./server/routes/bikeruta.js

//1. Importaciones
const express           = require('express')
const router            = express.Router()
const bikerutaController = require('./../controllers/bikerutaController')

//2. Ruteo (Router)
router.post('/create', bikerutaController.create)


// 3. Exportaciones
module.exports = router
