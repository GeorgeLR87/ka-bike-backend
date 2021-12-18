const bcryptjs = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const User     = require('./../models/User')

//Crear un usuario
exports.create = async (req, res) => {

    //1. Obtener usuario, email y password del formulario (REQ)
    const {
        nombre,
        apellido,
        pais,
        estado,
        direccion,
        email,
        password
    } = req.body

    //2° Realizar el proceso asíncrono
    try {
        //3 Generar password para base de datos 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //4 Crear usuario en base de datos 
        const newUser = await User.create({
        nombre,
        apellido,
        pais,
        estado,
        direccion,
        email,
        password: hashedPassword
        })

        //5 Autenticación de tokens
        // A. Crear un payload (Infomación del usuario)
        const payload = {
            user: {
                id: newUser._id // Id de mongodb del usurio
            }
        }

        //B. Firmar el Token
        jwt.sign(
            payload, //Los datos que acompañaran al token
            process.env.SECRET, //Palabra secreta (firma)
            {
                expiresIn:360000 //Expiración del token
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    msg: 'Token correctamente generado.',
                    data: token
                })
            }
        )
    } catch (error) {
     // 2b. En caso de error con await
     res.status(500).json({
         msg: 'Hubo un error con la creación de usuario.',
         error: error
     })   
    }
}