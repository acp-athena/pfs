const Database = require("../utils/database");

const banco = new Database();

class FilmeModel {

    #filmeId;
    #filmeNome;
    #filmeData;
    #filmeGenero;
    #filmeNota;

    //implementar getter e setter

    get filmeId() {
        return this.#filmeId;
    }
    set filmeId(filmeId) {
        this.#filmeId = filmeId
    }

    get filmeNome() {
        return this.#filmeNome;
    }
    set filmeNome(filmeNome) {
        this.#filmeNome = filmeNome;
    }

    get filmeData() {
        return this.#filmeData;
    }
    set filmeData(filmeData) {
        this.#filmeData = filmeData;
    }

    get filmeGenero() {
        return this.#filmeGenero;
    }
    set filmeGenero(filmeGenero) {
        this.#filmeGenero = filmeGenero;
    }
   
    get filmeNota(){
        return this.#filmeNota;
    }
    set filmeNota(filmeNota){
        this.#filmeNota = filmeNota;
    }

    //implementar construtor
    constructor(filmeId, filmeNome, filmeData, filmeGenero, filmeNota) {
        this.#filmeId = filmeId;
        this.#filmeNome = filmeNome;
        this.#filmeData = filmeData;
        this.#filmeGenero = filmeGenero;
        this.#filmeNota = filmeNota;
    }

    //implementar as funções para manipulação das informações no banco
    async listarFilme() {

        let sql = "select * from tb_filmes";

        let rows = await banco.ExecutaComando(sql);
        let listaFilme = [];

        for(let i = 0; i < rows.length; i++) {
            listaFilme.push(new FilmeModel(rows[i]["FilmeId"], rows[i]["FilmeNome"], rows[i]["FilmeDataLancamento"], rows[i]["FilmeGenero"], rows[i]["FilmeNota"]));
        }
        return listaFilme;
    }


    async buscar_id(FilmeId){
        let sql = "select * from tb_filmes where (FilmeId = ?)";
 
        let valores = [FilmeId];

        let rows = await banco.ExecutaComando(sql, valores);
        let listaFilme = [];

        for(let i = 0; i < rows.length; i++) {
            listaFilme.push(new FilmeModel(rows[i]["FilmeId"], rows[i]["FilmeNome"], rows[i]["FilmeDataLancamento"], rows[i]["FilmeGenero"], rows[i]["FilmeNota"]));
        }
        return listaFilme[0];
    }

    async cadastrarFilme(){
        let sql = "insert into tb_filmes (FilmeNome, FilmeDataLancamento, FilmeGenero, FilmeNota) values (?,?,?,?)";
        
        let valores = [this.#filmeNome, this.#filmeData, this.#filmeGenero, this.#filmeNota];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async delete(){
        let sql = "delete from tb_filmes where FilmeId = ?";

        let valores = [this.#filmeId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async editar(){
        let sql = "update tb_filmes set FilmeNome = ?, FilmeDataLancamento = ?, FilmeGenero = ?, FilmeNota = ? where FilmeId = ?";
        
        let valores = [this.#filmeNome, this.#filmeData, this.#filmeGenero, this.#filmeNota, this.#filmeId];
    
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
    
}

module.exports = FilmeModel;