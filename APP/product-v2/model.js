const sequelize = require('../../config/sequelize')
const { Sequelize, DataTypes } = require('sequelize');

const product = sequelize.define('product', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
    }
});

module.exports = product