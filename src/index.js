'use strict'

require('babel-register')
require('dotenv').config()

const app = require('./app')
const db = require('./models/db')
const PORT = parseInt(process.env.PORT, 10) || 8081
const HOST = process.env.HOST || '127.0.0.1'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const server = app
    .listen(PORT, HOST, function() {
        const host = server.address().address
        const port = server.address().port

        console.log('App listening at http://%s:%s', host, port)
    })
    .on('error', err => {
        console.error(err)
    })
