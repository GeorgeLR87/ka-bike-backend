//. /server/index.js

//1. Importaciones
const express     = require('express')
const app         = express()
const cors        = require('cors')

require('dotenv').config()
const connectDB   = require('./config/db')


//2. Middlewares
//Base de Datos
connectDB()

//Habilitar cors (Accesos de ambientes de Desarrollo de Terceros)
app.use(cors())

//Todas las peticiones y respuestas se manejan
app.use(express.json())


//3. Rutas

app.use('/bikesmtb', require('./routes/bikemtb'))
app.use('/bikesruta', require('./routes/bikeruta'))

app.use('/users', require('./routes/users'))
app.use('/admin', require('./routes/admin'))


//4. Server
app.listen(process.env.PORT, () => {
    console.log(`servidor trabajando en puerto: http://localhost:${process.env.PORT}`)
})