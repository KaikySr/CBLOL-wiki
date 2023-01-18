
const jogador = require('../model/jogador');
const time = require('../model/time');

module.exports = {
    async pagInicialget(req, res){

        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });

        res.render('../views/index', {times, jogadores: '', id: ''});

    },

    async pagInicialPost(req, res){

        
        const id = req.body.nome;

        const jogadores = await jogador.findAll({
            raw: true,
            attributes: ['IDJogador', 'Nome', 'DataNasc', 'Lane', 'Foto'],
            where: { IDTime: id }
        });

        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });

        res.render('../views/index', {times, jogadores, id});

    }
}




