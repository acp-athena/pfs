const Database = require("../utils/database");

const banco = new Database();

class PerfilModel {

    #perfilDescricao;
    #perfilId;
    //implementar getter e setter

    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId){
        this.#perfilId = perfilId;
    }

    get perfilDescricao() {
        return this.#perfilDescricao;
    }

    set perfilDescricao(perfilDescricao){
        this.#perfilDescricao = perfilDescricao;
    }

    //implementar construtor
    constructor(perfilId, perfilDescricao) {
        this.#perfilId = perfilId;
        this.#perfilDescricao = perfilDescricao;

    }
    
    async listar(){

        let sql = "select * from tb_perfil";

        let rows = await banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i < rows.length; i++){
            let perfil = new PerfilModel(rows[i]["per_id"], rows[i]["per_nome"]);

            lista.push(perfil);
        }

        return lista;
    }


}

module.exports = PerfilModel;