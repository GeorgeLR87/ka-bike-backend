// ./server/routes/admin.js

//1. Importaciones 
const express        = require('express')
const router         = express.Router()
const adminController = require('./../controllers/adminController')
const authorization  = require('./../middleware/authorization')

//2. Router
router.post('/create', adminController.create)
router.post('/login', adminController.login)
router.get('/verifytoken', authorization, adminController.verifyToken)



//3. Exportación
module.exports = router