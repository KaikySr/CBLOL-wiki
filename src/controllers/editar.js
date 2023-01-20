
// Importando as tabelas do DB
const jogador = require('../model/jogador');
const time = require('../model/time');
const { Sequelize } = require('sequelize');

// Utilizado para excluir arquivos
const fs = require('fs');

module.exports = {
    async jogador(req, res){

        // Recebendo o id da URL
        const parametro = req.params.id;

        const jogadores = await jogador.findByPk(parametro, {raw: true, attributes: ['IDJogador', 'Nome', 'DataNasc', 'Lane', 'Foto', 'IDTime']});

        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome', 'Capacidade'] });

        const qntJogadores = await jogador.findAll({raw: true, group: ['IDTime'], attributes: ['IDTime', [Sequelize.fn('count', Sequelize.col('IDTime')), 'Qnt'] ]});

        let todosTimes = [];
        for (let i=0; i<times.length; i++ ) {
            for (let j=0; j<qntJogadores.length; j++ ){
                if (times[i].IDSala == qntJogadores[j].IDTime) {
                    times[i].Capacidade -= qntJogadores[j].Qnt;
                }
            }
            if (times[i].Capacidade!=0 || times[i].IDTime==jogadores.IDTime){
                todosTimes.push(times[i]);
            }
        }
     
        res.render('../views/editarJogadores', {todosTimes, jogadores});

    },

    async jogadorUpdate(req, res){

        const dados = req.body;
        const id = req.params.id;

        if (dados.envio == 'Excluir') {

            const antigaFoto =  await jogador.findAll({raw: true, attributes: ['Foto'], where: { IDJogador: id } });
            if (antigaFoto[0].Foto != 'NovoUsuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            await jogador.destroy({ where: { IDJogador: id } });
            res.redirect('/');
            return;
        }

        if (req.file) {

            const antigaFoto =  await jogador.findAll({raw: true, attributes: ['Foto'], where: { IDJogador: id } });
            if (antigaFoto[0].Foto != 'NovoUsuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));
            
            await jogador.update(
                {Foto: req.file.filename},
                {where: { IDJogador: id }}
            );
            
        }

        await jogador.update({
            Nome: dados.nome,
            DataNasc: dados.dataNasc,
            Lane: dados.lane,
            IDTime: dados.time
        },
        {
            where: { IDJogador: id }
        });
     
        res.redirect('/');
    },

    async time(req, res){

        const params = req.params.id;
     
        if(params == 0) res.redirect('/');

        const times = await time.findByPk(params);

        res.render('../views/editarTimes', {times});
     
    },
    
    async timeUpdate(req, res){
 
        const id = req.params.id;
        const dados = req.body;

        if (dados.botao == 'Excluir') {

            const jogadores = await jogador.findAll({ raw: true, attributes: ['IDJogador', 'Foto'], where: { IDTime: id } });

            for (let i=0; i<jogadores.length; i++) 
            {
                const antigaFoto =  await jogador.findAll({raw: true, attributes: ['Foto'], where: { IDJogador: jogadores[i].IDJogador } });

                if (antigaFoto[0].Foto != 'NovoUsuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

                await jogador.destroy({ where: { IDJogador: jogadores[i].IDJogador } });
            }

            await time.destroy({ where: { IDTime: id } });

            res.redirect('/');
            return;
        }

        await time.update({
            Nome: dados.nome,
            Capacidade: dados.qnt
        },
        {
            where: { IDTime: id }
        });

        res.redirect('/');
     
    }

}

