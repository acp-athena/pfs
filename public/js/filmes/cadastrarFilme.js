document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnCadastrarFilme").addEventListener("click", cadastrarFilme);

    function limparValidacao(){
        document.getElementById("filmeNome").style["border-color"] = "#ced4da";
        document.getElementById("filmeData").style["border-color"] = "#ced4da";
        document.getElementById("filmeGenero").style["border-color"] = "#ced4da";
        document.getElementById("filmeNota").style["border-color"] = "#ced4da";
    }

    function cadastrarFilme(){
        limparValidacao();
        let nome = document.querySelector("#filmeNome").value;
        let data = document.querySelector("#filmeData").value;
        let genero = document.querySelector("#filmeGenero").value;
        let nota = document.querySelector("#filmeNota").value;

        let listaErros = [];
        if(nome == ""){
            listaErros.push("filmeNome");
        }
        if(data == ""){
            listaErros.push("filmeData");
        }
        if(genero == ""){
            listaErros.push("filmeGenero");
        }
        if(nota == 0){
            listaErros.push("filmeNota");
        }

        if(listaErros.length == 0){
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                data: data,
                genero: genero,
                nota: nota,
            }

            fetch("/filmes/cadastrar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok){
                    window.location.href="/filmes";
                }
                else{
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o procedimento incorreto
            for(let i = 0; i < listaErros.length; i++){
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})