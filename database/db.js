const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASWORD,
    database: process.env.DB_DATABASE
})

connection.connect((error) => {
    if (error) {
        console.log('No se pudo conectar a la base de datos pendejo')
        return
    }
    console.log('Coneccion exitosa guap@ :)')
})

module.exports = connection