// ./server/routes/bikeruta.js

//1. Importaciones
const express           = require('express')
const router            = express.Router()
const bikerutaController = require('./../controllers/bikerutaController')

//2. Ruteo (Router)
router.post('/create', bikerutaController.create)
router.get('/readall', bikerutaController.readAll)
router.get('/readone/:id', bikerutaController.readOne)
router.put('/edit/:id', bikerutaController.edit)
router.delete('/delete/:id', bikerutaController.delete)


// 3. Exportaciones
module.exports = router
