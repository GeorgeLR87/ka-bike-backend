// ./server/routes/admin.js

//1. Importaciones 
const express        = require('express')
const router         = express.Router()
const adminController = require('./../controllers/adminController')
const authorization  = require('./../middleware/authorization')

//2. Router
router.post('/create', adminController.create)


//3. Exportación
module.exports = router