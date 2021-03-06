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

//Iniciar sesión
//Autenticar que la persona pase su email y contraseña. Coincidad y se le enví un token.
exports.login = async (req, res) => {
    //1. Obtener el email y el password del formulario (json)
    const { email, password } = req.body

    try {
        //2. Encontrar un usuario en base de datos
        const foundUser = await User.findOne({ email })

        //3. Validación - Si no Hubo un usuario...
        if(!foundUser) {
            return res.status(400).json({
                msg: 'el usuario o la contraseña son incorrectos'
            })
        }

        //4. Si todo ok, el usuario fue encontrado, entonces, evaluamos la contraseña.
        const verifiedPass = await bcryptjs.compare(password, foundUser.password)

        //5. Validacioón - Si el password no coincide...
        if(!verifiedPass) {
            return await res.status(400).json({
                msg: 'El usuario o la contraseña no coinciden.'
            })
        }

        //6. Si todo coincide y es correcto, generamos un json web token

        console.log('foundUser:', foundUser)

        //6a. Establecer un payload (datos del usuario)
        const payload = {
            user: {
                id: foundUser.id
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

//Verificar Usuario
exports.verifyToken = async (req, res) => {
    try {
        //1. Buscar el Id del usuario (del token abierto) en base de datos
        const foundUser = await User.findById(req.user.id).select('-password')

        return res.json({
            msg: 'Datos de usuario encontrados.',
            data: foundUser
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Hubo un error con el usuario'
        })
    }
}
