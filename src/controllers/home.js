
const jogador = require('../model/jogador');
const time = require('../model/time');

module.exports = {
    async pagInicialget(req, res){

        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });

        res.render('../views/index', {times, jogadores: '', id: {ID: 0, InformarVagas: ''}});

    },

    async pagInicialPost(req, res){

        const ID = req.body.nome;
        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });

        let InformarVagas, jogadores = '';
        if (ID == "")
        {
            InformarVagas = 'Selecione um time.';

        } 
        else 
        {
            jogadores = await jogador.findAll({
                raw: true,
                attributes: ['IDJogador', 'Nome', 'DataNasc', 'Lane', 'Foto'],
                where: { IDTime: ID }
            });

            let max = await time.findByPk(ID, { raw: true, attributes: ['Capacidade'] });
            InformarVagas = `Vagas para esse time: ${max.Capacidade - jogadores.length}`;
        };

        const id = { ID, InformarVagas: InformarVagas };
        res.render('../views/index', {times, jogadores, id});

    }
}




