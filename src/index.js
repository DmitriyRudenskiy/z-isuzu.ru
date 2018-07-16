require('babel-register')
require('dotenv').config()

const app = require('./app')
const db = require('./models/db')
const port = parseInt(process.env.PORT, 10) || 8081
const host = process.env.PORT || '127.0.0.01'

db.sequelize
    .authenticate()
    .then(() => {
        console.log('MYSQL: Connection has been established successfully.')

        const server = app
            .listen(port, host, function() {
                const host = server.address().address
                const port = server.address().port

                console.log('App listening at http://%s:%s', host, port)
            })
            .on('error', err => {
                console.error(err)
            })
    })
    .catch(err => {
        console.error('MYSQL:  Unable to connect to the database:', err)
    })
