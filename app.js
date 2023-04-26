// Lamamos a los paquetes y archivos desarrollados
const express = require('express')
const dotenv = require('dotenv')
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const app = express()

// Seteamos urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Configurar dotenv
dotenv.config({ path: './env/.env' })

// setiar el directorio publico
app.use('/resources', express.static('public'))
app.use('/resources', express.static(__dirname + '/public'))

// establecemos el motor de plantilla
app.set('vier engine', 'ejs')

// Variable de session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Conneccion a la base de datos
const connection = require('./database/db')

// Establecer las rutas
app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Registro
app.post('/resiter', async (req, res) => {
    // Capturamos la informacion ingresada en el formulario
    // nota: poner todos los campos sin esepcion(Hay un metodo donde se puede hacer mas rapido)
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.passwor;
    let passwordHash = await bcryptjs.hash(pass, 8)
    connection.query('INSERT INTO user SET ?', { user: user, name: name, pass: passwordHash }, async (error, results) => {
        if (error) {
            console.log(error)
        }
        else {
            res.render('register.ejs', {
                alert: true,
                alertTile: "Registro",
                alertMassage: "El registro a sigo exitoso",
                alertIcono: 'success',
                showConfirmButton: false,
                time: 2500,
                ruta: ''
            })
            // res.send('Fuel exitosa la creacion de usuario')
        }
    })
})

app.listen(4000, (req, res) => {
    console.log('El servidor esta activado in http://localhost:4000')
})