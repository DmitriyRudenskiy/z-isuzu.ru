import { Sequelize, sequelize } from './db'

const carModel = sequelize.define(
    'images',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        slug: {
            type: Sequelize.STRING,
        },
        createdAt: {
            field: 'created_at',
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            allowNull: false,
            type: Sequelize.DATE,
        },
    },
    {
        tableName: 'models',
    }
)

module.exports = carModel
