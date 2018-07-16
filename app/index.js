require('babel-register')

const app = require('./app')
// const config = require('dotenv').config();
const port = parseInt(process.env.PORT, 10) || 8081

app.listen(port, function() {
    console.log('Example app listening on port ' + port)
})
