import { Sequelize, sequelize } from './db'

import Product from './product.model'

const Image = sequelize.define(
    'Image',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        modelId: {
            field: 'model_id',
            type: Sequelize.INTEGER,
        },
        parent_number: {
            type: Sequelize.INTEGER,
        },
        number: {
            type: Sequelize.INTEGER,
        },
        hash: {
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
        tableName: 'images',
    }
)

module.exports = Image

Image.hasMany(Product, { foreignKey: 'image_id', as: 'products' })
/*
    scope: {
        commentable: 'post'
    }});
    */
