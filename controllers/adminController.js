const bcryptjs = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const Admin     = require('./../models/Admin')

//Crear un usuario
exports.create = async (req, res) => {

    //1. Obtener usuario, email y password del formulario (REQ)
    const {
        nombre,
        apellido,        
        email,
        password
    } = req.body

    //2° Realizar el proceso asíncrono
    try {
        //3 Generar password para base de datos 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //4 Crear usuario en base de datos 
        const newAdmin = await Admin.create({
        nombre,
        apellido,
        email,
        password: hashedPassword
        })

        //5 Autenticación de tokens
        // A. Crear un payload (Infomación del usuario)
        const payload = {
            user: {
                id: newAdmin._id // Id de mongodb del usurio
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
         msg: 'Hubo un error con la creación de administrator.',
         error: error
     })   
    }
}

exports.login = async (req, res) => {
    //1. Obtener el email y el password del formulario (json)
    const { email, password } = req.body

    try {
        //2. Encontrar un usuario en base de datos
        const foundAdmin = await Admin.findOne({ email })

        //3. Validación - Si no Hubo un usuario...
        if(!foundAdmin) {
            return res.status(400).json({
                msg: 'el administrador o la contraseña son incorrectos'
            })
        }

        //4. Si todo ok, el usuario fue encontrado, entonces, evaluamos la contraseña.
        const verifiedPass = await bcryptjs.compare(password, foundAdmin.password)

        //5. Validacioón - Si el password no coincide...
        if(!verifiedPass) {
            return await res.status(400).json({
                msg: 'El administrador o la contraseña no coinciden.'
            })
        }

        //6. Si todo coincide y es correcto, generamos un json web token

        console.log('foundAdmin:', foundAdmin)

        //6a. Establecer un payload (datos del usuario)
        const payload = {
            user: {
                id: foundAdmin.id
            }
        }

        //6b. firma del JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    msg: 'Inicio de sesión exitoso.',
                    data: token
                })
            }
        )

        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un problema con la autenticación.',
            data: error
        })
        
    }
}