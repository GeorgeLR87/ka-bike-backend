// ./server/routes/bikemtb.js

//1. Importaciones
const express           = require('express')
const router            = express.Router()
const bikemtbController = require('./../controllers/bikemtbController')

//2. Ruteo (Router)
router.post('/create', bikemtbController.create)
router.get('/readall', bikemtbController.readAll)
router.get('/readone/:id', bikemtbController.readOne)
router.put('/edit/:id', bikemtbController.edit)


// 3. Exportaciones
module.exports = router
