let nome_entrar_label = document.querySelector('#nome_entrar_label')
let senha_entrar_label = document.querySelector('#senha_entrar_label')
let nome_entrar = document.querySelector('#nome_entrar')
let senha_entrar = document.querySelector('#senha_entrar')

let nome_criar_label = document.querySelector('#nome_criar_label')
let senha_criar_label = document.querySelector('#senha_criar_label')
let repete_criar_label = document.querySelector('#repete_criar_label')
let nome_criar = document.querySelector('#nome_criar')
let senha_criar = document.querySelector('#senha_criar')
let repete_senha = document.querySelector('#repete_senha')

let botao_entrar = document.querySelector('#botao_entrar')
let botao_criar = document.getElementById('botao_entrar2')

let descrição_recado = document.querySelector("#descrição_recado")
let detalhamento_recado = document.querySelector('#detalhamento_recado')
let id_recado = document.querySelector('#id_recado')
let salvar_recado = document.querySelector('#salvar_recado')
let tabela_recados = document.querySelector('#tabela_recados')

let alerta_login = document.querySelector('.alerta_login')
let alerta_cadastro = document.querySelector('.alerta_cadastro')

let banco_de_dados = []
let banco_de_dados_recados = []


if(nome_criar)nome_criar.addEventListener('keyup', ()=>{
    if(nome_criar.value.length <= 5){
        nome_criar_label.setAttribute('style', 'color: red')
        nome_criar_label.innerHTML = 'Nome * insira no minimo 6 caracteres'
    }else{
        nome_criar_label.setAttribute('style', 'color: green')
        nome_criar_label.innerHTML = 'Nome'
    }
})
if(senha_criar)senha_criar.addEventListener('keyup', ()=>{
    if(senha_criar.value.length <= 7){
        senha_criar_label.setAttribute('style', 'color: red')
        senha_criar_label.innerHTML = 'Senha * insira no minimo 8 caracteres'
    }else{
        senha_criar_label.setAttribute('style', 'color: green')
        senha_criar_label.innerHTML = 'Senha'
    }
})
if(repete_senha)repete_senha.addEventListener('keyup', ()=>{
    if(senha_criar.value !== repete_senha.value){
        repete_criar_label.setAttribute('style', 'color: red')
        repete_criar_label.innerHTML = 'Reescreva a mesma senha'
    }else{
        repete_criar_label.setAttribute('style', 'color: green')
        repete_criar_label.innerHTML = 'Reescreva'
    }
})
//CRIAR CONTA
if(botao_criar) botao_criar.addEventListener('click', fazer_conta)
function fazer_conta(){
    let validacao = true
    //vai ver se existe
    if(nome_criar.value.length <= 5 || senha_criar.value.length <=7 || senha_criar.value !== repete_senha.value){
        validacao = false
        alerta_cadastro.innerHTML=`
                <div class="col-10 ">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <p>Preencha corretamente os dados</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                `        
    }
    if(localStorage.contas){
        //vai verificar se tem alguma coisa dentro do .contas
        banco_de_dados = JSON.parse(localStorage.contas) || []
        for(conta of banco_de_dados){
            if(conta.nome === nome_criar.value){
                validacao = false 
                alerta_cadastro.innerHTML=`
                <div class="col-10 ">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <p>Nome de usuario já existente</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                `                
                break
            }
        }   
    }
        if(validacao === true){
            banco_de_dados.push({
            nome: nome_criar.value,
            senha: repete_senha.value
            })
            localStorage.setItem('contas', JSON.stringify(banco_de_dados))
            console.log(localStorage.contas);
            alerta_cadastro.innerHTML=`
            <div class="col-10 ">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <p>cadastro feito com sucesso!!!</p>
                </div>
            </div>
            `
            setTimeout(() => {  window.open("index.html", "_self") }, 2000)
        }
}


if(nome_entrar)nome_entrar.addEventListener('keyup', ()=>{
    if(nome_entrar.value.length <= 5){
        nome_entrar_label.setAttribute('style', 'color: red')
        nome_entrar_label.innerHTML = 'Nome * insira no minimo 6 caracteres'
    }else{
        nome_entrar_label.setAttribute('style', 'color: green')
        nome_entrar_label.innerHTML = 'Nome'
    }
})
if(senha_entrar)senha_entrar.addEventListener('keyup', ()=>{
    if(senha_entrar.value.length <= 7){
        senha_entrar_label.setAttribute('style', 'color: red')
        senha_entrar_label.innerHTML = 'Senha * insira no minimo 8 caracteres'
    }else{
        senha_entrar_label.setAttribute('style', 'color: green')
        senha_entrar_label.innerHTML = 'Senha'
    }
})
//ENTRAR NA CONTA
if(botao_entrar) botao_entrar.addEventListener('click', entrar)
function entrar(){
    let dados = JSON.parse(localStorage.getItem('contas'))
    if (dados === null){
        alerta_login.innerHTML=`
        <div class="col-10 ">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <p>Preencha os dados corretamente</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        `
        return
    }
    let verifica_conta = dados.some((el)=>el.nome === nome_entrar.value && el.senha === senha_entrar.value)
    if(verifica_conta){
        alerta_login.innerHTML=`
        <div class="col-10 ">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <p>Login feito com sucesso!!!</p>
            </div>
        </div>
        `
        setTimeout(() => {  window.open("recado.html", "_self") }, 2000)
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
    }else{
        alerta_login.innerHTML=`
        <div class="col-10 ">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <p>Nome ou Senha incorretos</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        `
    }
    }
//RECADOS

if(salvar_recado) salvar_recado.addEventListener("click", novo_recado)

function novo_recado(){
    // verifica se esta editando recado
    if(descrição_recado.value == '' || detalhamento_recado.value == ''){
        return
    }
    if(id_recado.value.length > 0) {
        let recado_editar = JSON.parse(localStorage.getItem('recados'))
        let ids = recado_editar.map(el => `${el.id}`)
        let indexEditar = ids.indexOf(id_recado.value)

        recado_editar[indexEditar].descrição = descrição_recado.value;
        recado_editar[indexEditar].detalhamento = detalhamento_recado.value;
        localStorage.setItem('recados', JSON.stringify(recado_editar))

        descrição_recado.value = "";
        detalhamento_recado.value = "";
        id_recado.value = "";
    } else {
        // criando novo recado
        banco_de_dados_recados = JSON.parse(localStorage.getItem('recados')) || []
        banco_de_dados_recados.push({
        id: Math.floor(Math.random() * 123487687654533),
        descrição: descrição_recado.value, 
        detalhamento: detalhamento_recado.value

    })
        descrição_recado.value = "";
        detalhamento_recado.value = "";
        id_recado.value = "";

    localStorage.setItem('recados', JSON.stringify(banco_de_dados_recados))
    }
    atualiza_recados()
}

function atualiza_recados(){
    let dd = JSON.parse(localStorage.getItem('recados'))
    let tbody = document.querySelector('tbody')
    tbody.innerHTML = ""
    dd.forEach(element => {
        tbody.innerHTML += `
        <tr>
            <td><strong>#</strong></td>
            <td> ${element.descrição} </td>
            <td> ${element.detalhamento} </td>
            <td> 
            <button onClick="edita_recado(${element.id})" class="button_recado_editar">Editar</button>
            <button onClick="deleta_recado(${element.id})" class="button_recado_deletar">Deletar</button>
            </td>

        </tr>
        `
    });
}
function edita_recado(id){
    let recado_editar = JSON.parse(localStorage.getItem('recados'))
    let recadoAEditar = recado_editar.filter(el => el.id === id)
    let recadoEditar = recadoAEditar[0]

    descrição_recado.value = recadoEditar.descrição
    detalhamento_recado.value = recadoEditar.detalhamento
    id_recado.value = recadoEditar.id

    // pegar os dados do recado pelo ID
    // preencher os inputs.value com os dados
    // atualizar
}

function deleta_recado(id){
    // pega recados do localstorage
    let recado_delete = JSON.parse(localStorage.getItem('recados'))

    let ids = recado_delete.map(el => el.id)
    let indexDeletar = ids.indexOf(id)

    recado_delete.splice(indexDeletar, 1)

    localStorage.setItem('recados', JSON.stringify(recado_delete))

    atualiza_recados()
}

function sair(){
    localStorage.removeItem('token')
    window.open("index.html", "_self")
}