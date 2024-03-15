document.addEventListener("DOMContentLoaded", function () {
    let userId = window.location.pathname.split("/")[3];
    console.log({ userId });

    document.getElementById("btnCadastrar").addEventListener("click", editar);

    function limparValidacao() {
        document.getElementById("usuarioNome").style["border-color"] = "#ced4da";
        document.getElementById("usuarioEmail").style["border-color"] = "#ced4da";
        document.getElementById("usuarioSenha").style["border-color"] = "#ced4da";
        document.getElementById("usuarioPerfil").style["border-color"] = "#ced4da";
    }

    function editar() {
        limparValidacao();
        let nome = document.querySelector("#usuarioNome").value;
        let email = document.querySelector("#usuarioEmail").value;
        let senha = document.querySelector("#usuarioSenha").value;
        let perfil = document.querySelector("#usuarioPerfil").value;
        let ativo = document.querySelector("#usuarioAtivo").checked;

        let listaErros = [];
        if (nome == "") {
            listaErros.push("usuarioNome");
        }
        if (email == "") {
            listaErros.push("usuarioEmail");
        }
        if (senha == "") {
            listaErros.push("usuarioSenha");
        }
        if (perfil == 0) {
            listaErros.push("usuarioPerfil");
        }

        if (listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                email: email,
                senha: senha,
                ativo: ativo,
                perfil: perfil,
            }

            fetch(`/usuarios/alterar/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    alert(r.msg);
                    if (r.ok) {
                        window.location.href = "/usuarios";
                    }
                })
        }
        else {
            //avisar sobre o procedimento incorreto
            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }
})