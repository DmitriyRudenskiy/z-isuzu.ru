import { Sequelize, sequelize } from './db'

const Product = sequelize.define(
    'images',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        imageId: {
            field: 'image_id',
            type: Sequelize.INTEGER,
        },
        number: {
            field: 'col_7',
            type: Sequelize.STRING,
        },
        name: {
            field: 'col_1',
            type: Sequelize.STRING,
        },
        code: {
            field: 'col_6',
            type: Sequelize.STRING,
        },
    },
    {
        underscored: true,
        timestamps: false,
        tableName: 'products',
    }
)

module.exports = Product
