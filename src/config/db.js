const sequelize = require('sequelize');

const database = new sequelize('CBLOLWIKI', 'KaikySantosRibeiro', 'Animais@1234',
{
    dialect: 'mssql', host:'localhost', port: 49766
});

database.sync();

module.exports = database;
