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
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Registro
app.post('/register', async (req, res) => {
    // Capturamos la informacion ingresada en el formulario
    // nota: poner todos los campos sin esepcion(Hay un metodo donde se puede hacer mas rapido)
    const rol = req.body.rol;
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.password;
    const tutor = req.body.tutor;
    let passwordHash = await bcryptjs.hash(pass, 8)
    connection.query('INSERT INTO user SET ?', { rol_user: rol, name_user: name, user_user: user, password_user: passwordHash, tutor_user: tutor }, async (error, results) => {
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
                timer: 2500,
                ruta: ''
            })
            // res.send('Fuel exitosa la creacion de usuario')
        }
    })
})

app.listen(4000, (req, res) => {
    console.log('El servidor esta activado in http://localhost:4000')
})