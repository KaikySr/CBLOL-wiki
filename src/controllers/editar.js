
// Importando as tabelas do DB
const jogador = require('../model/jogador');
const time = require('../model/time');

// Utilizado para excluir arquivos
const fs = require('fs');

module.exports = {
    async jogadores(req, res){

        // Recebendo o id da URL
        const parametro = req.params.id;

        const jogadores = await jogador.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDJogador', 'Nome', 'DataNasc', 'Lane', 'Foto', 'IDTime']
        });

        const times = await time.findAll({ raw: true, attributes: ['IDTime', 'Nome'] });
        
        res.render('../views/editarJogadores', {times, jogadores});

    },

    async adicionar(req, res){

        const dados = req.body;
        const id = req.params.id;


        // Se foi enviado alguma foto
        if (req.file) {

            // Recebendo a antiga foto do aluno
            const antigaFoto = await jogador.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDJogador: id }
            });

            // Excluindo a foto da pasta
            if (antigaFoto[0].Foto != 'NovoUsuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            // Update da nova foto no DB
            await jogador.update(
                {Foto: req.file.filename},
                {where: { IDjogador: id }}
            );
            
        }

        // Dando upgrade nas informações novas
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
        
    }
}
