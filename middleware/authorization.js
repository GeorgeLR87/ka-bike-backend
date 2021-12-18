// ./server/middleware/authorization.js
const jwt = require('jsonwebtoken')

const decrypt = async (req, res, next) => {
    //Captura el token y lo guarda en una variable
    const token = req.header('x-auth-token')

    //Si no hay token
    if(! token){
        return res.status(401).json({
            msg: 'No hay token, permitido no válido'
        })
    }
    //Si  sí hay token y todo bien...
    try {
        const openToken = await jwt.verify(token, process.env.SECRET)

        console.log('openToken', openToken)

        req.user = openToken.user

        next()
    } catch (error) {
        console.log(error)

        res.json(
            {
                msg: 'Hubo un error en el token.'
            }
        )
    }
}

module.exports = decrypt