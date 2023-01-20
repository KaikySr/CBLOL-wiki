const time = require('../model/time');
const jogador = require('../model/jogador');
const { Sequelize } = require('sequelize');

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

        const qntJogadores = await jogador.findAll({
            raw: true,
            group: ['IDTime'],
            attributes: ['IDTime', [Sequelize.fn('count', Sequelize.col('IDTime')), 'Qnt'] ]
        });
    
        let todosTimes = [];
            for (let i=0; i<times.length; i++ ) {
                for (let j=0; j<qntJogadores.length; j++ )
                {
                    if (times[i].IDTime == qntJogadores[j].IDTime) 
                    {
                        times[i].Capacidade -= qntJogadores[j].Qnt;
                    }
                }

                if (times[i].Capacidade != 0)
                {
                    todosTimes.push(times[i]);
                }
            }

            res.render('../views/cadastroJogador', {todosTimes});
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
