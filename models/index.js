const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    "productos",
    "root",
    "1234",
    {
        host: "localhost",
        dialect: "mysql"
    }
)

module.exports = sequelize;