const time = require('../model/time');
const jogador = require('../model/jogador');


module.exports = {
    async time(req, res){
        res.render('../views/cadastroTime');
    },

    async timeInsert(req, res){

        const dados = req.body;

        await time.create({
            Nome: dados.nome,
            Capacidade: dados.qnt
        });

        res.redirect('/');

    },

    async jogador(req, res){
        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });
        res.render('../views/cadastroJogador', {times});
    },

    async jogadorInsert(req, res){

        const dados = req.body;

        let foto = 'NovoUsuario.png';

        if (req.file) {
        
            foto = req.file.filename;
        }

        await jogador.create({
            Nome: dados.nome,
            DataNasc: dados.dataNasc,
            Lane: dados.lane,
            IDTime: dados.time,
            Foto: foto
        });

        res.redirect('/');

    }
}
