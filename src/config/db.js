const sequelize = require('sequelize');

const database = new sequelize('CBLOLWiKI', 'KaikySantosRibeiro', 'Animais@1234',
{
    dialect: 'mssql', host:'localhost', port: 49734
});

database.sync();

module.exports = database;
