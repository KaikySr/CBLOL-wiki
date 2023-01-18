const express = require('express');
const route = express.Router();


const multer = require("multer");
const config = require('./src/config/multer');


const home = require('./src/controllers/home');
const editar = require('./src/controllers/editar');
const cadastro = require('./src/controllers/cadastro');


route.get('/', home.pagInicialget);
route.post('/', home.pagInicialPost);

route.get('/cadastroJogador', cadastro.jogador);
route.post('/cadastroJogador', multer(config).single('foto'), cadastro.jogadorInsert);

route.get('/cadastroTime', cadastro.time);
route.post('/cadastroTime', cadastro.timeInsert);

route.get('/editarJogadores/:id', editar.jogadores);
route.post('/editarJogadores/:id', multer(config).single('foto'), editar.adicionar);

module.exports = route;
