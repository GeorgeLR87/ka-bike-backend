// ./server/routes/users.js

//1. Importaciones 
const express        = require('express')
const router         = express.Router()
const userController = require('./../controllers/userController')
const authorization  = require('./../middleware/authorization')

//2. Router
router.post('/create', userController.create)
router.post('/login', userController.login)
router.get('/verifytoken', authorization, userController.verifyToken)


//3. Exportación
module.exports = router