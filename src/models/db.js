const Sequelize = require('sequelize')

const sequelize = new Sequelize('new_isuzu_toptk_ru', 'root', '123', {
    host: 'db',
    dialect: 'mysql',
    //logging: false,
    freezeTableName: true,
    operatorsAliases: false,
})

module.exports = { Sequelize, sequelize }
