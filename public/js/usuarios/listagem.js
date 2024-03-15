function deletar(id){
    fetch(`/usuarios/deletar/${id}`, {
        method: "DELETE"
    })
    .then((r) => r.json())
    .then((r) => {
        alert(r.msg);
        if(r.ok){
            window.location.reload();
        }
    });
}