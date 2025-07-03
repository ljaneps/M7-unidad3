const {DataTypes} = require('sequelize');
const sequelize = require("./index");

const Producto = sequelize.define('Tienda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'tienda',
    timestamps: false
});

module.exports = Producto;