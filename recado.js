if (localStorage.getItem('token') == null){
    alert ('Você precisa estar logado para acessar essa página')
    window.open("index.html", "_self")
}