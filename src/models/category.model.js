import { Sequelize, sequelize } from './db'

const Category = sequelize.define(
    'Category',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        parent_number: {
            type: Sequelize.INTEGER,
        },
        number: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        image: {
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
        tableName: 'spare_parts',
    }
)

module.exports = Category
