
const Sequelize = require('sequelize');
const database = require('../config/db');
const time = require('./time');

const jogador = database.define('Jogador', {
    IDJogador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    DataNasc: {
        type: Sequelize.DATE,
        allowNull: false
    },

    Lane: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    Foto: {
        type: Sequelize.STRING(50),
        allowNull: false
    }

});


jogador.belongsTo(time, {
    constraint: true, 
    foreignKey: 'IDTime'
});


module.exports = jogador;