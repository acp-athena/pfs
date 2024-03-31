const FilmeModel = require("../models/filmeModel");

class FilmeController{

    async listagemFilmeView(req, resp){
        let filme = new FilmeModel();
        let listaFilme = await filme.listarFilme();
        
        resp.render("filmes/listarFilme", { listaFilme: listaFilme });
    }

    cadastroFilmeView(req, resp){
        resp.render("filmes/movie");
    }

    async cadastrarFilme(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.filmeNome != "" && req.body.filmeData != "" && req.body.filmeGenero != "" &&
        req.body.filmeNota != "") {
            let filme = new FilmeModel (0, req.body.nome, req.body.data, req.body.genero, req.body.nota);

            let result = await filme.cadastrarFilme();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Filme cadastrado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar filme!"
                })
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }
    
    async editar(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.filmeNome != "" && req.body.filmeData != "" && req.body.filmeGenero != "" &&
        req.body.filmeNota != "") {
            let filme = new FilmeModel (id, req.body.nome, req.body.data, req.body.genero, req.body.nota);

            let result = await filme.editar();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Filme editado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar filme!"
                })
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async alterarView(req, res){
        console.log(req.params.id);

        let filme = new FilmeModel();
        let filmeSelecionado = await filme.buscar_id(req.params.id);

        res.render('filmes/alterarFilme', {filme: filmeSelecionado});
    }

    async deletar(req, resp){
        let id = req.params.id;
        let filme = new FilmeModel(id, null, null, null, null, null);

        let result = await filme.delete();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Filme excluido com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir filme!"
            })
        }

    }

}

module.exports = FilmeController;