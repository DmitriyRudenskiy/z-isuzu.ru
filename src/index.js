require('babel-register')

const app = require('./app')
// const config = require('dotenv').config();
const port = parseInt(process.env.PORT, 10) || 8081

const server = app
    .listen(port, function() {
        const host = server.address().address
        const port = server.address().port

        console.log('App listening at http://%s:%s', host, port)
    })
    .on('error', err => {
        console.error(err)
    })

module.exports = server
