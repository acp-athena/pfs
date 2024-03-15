const UsuarioModel = require("../models/usuarioModel");

class UsuarioController{


    async listagemView(req, resp){
        let usuario = new UsuarioModel();
        let listaUsuarios = await usuario.listar();
        
        resp.render("usuarios/listagem", { lista: listaUsuarios });
    }

    cadastroView(req, resp){
        resp.render("usuarios/cadastro");
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.usuarioEmail != "" && req.body.usuarioSenha != "" && req.body.usuarioNome != "" &&
        req.body.usuarioTipo != '0') {
            let usuario = new UsuarioModel (0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

            let result = await usuario.cadastrar();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Usuário cadastrado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar usuário!"
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

        if(req.body.usuarioEmail != "" && req.body.usuarioSenha != "" && req.body.usuarioNome != "" &&
        req.body.usuarioTipo != '0') {
            let usuario = new UsuarioModel (id, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

            let result = await usuario.editar();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Usuário editado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar usuário!"
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

        let usuario = new UsuarioModel();
        let usuarioSelecionado = await usuario.buscar_id(req.params.id);

        res.render('usuarios/alterar', {user: usuarioSelecionado});
    }

    async deletar(req, resp){
        let id = req.params.id;
        let usuario = new UsuarioModel(id, null, null, null, null, null);

        let result = await usuario.delete();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Usuário excluido com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir usuário!"
            })
        }

    }

}

module.exports = UsuarioController;