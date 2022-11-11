let nome1 = document.getElementById('nome1')                    // Nome1 e Nome2 podem ser qualquer coisa
let nome2 = document.getElementById('nome2')

let email = document.getElementById('email')                    // Email confere no banco se já existe um ingual
let mensagemValidMail = document.getElementById('mail-valid')
let validMail = false

let cpf = document.getElementById('cpf')                        // CPF precisa da máscara OK
let senha = document.getElementById('password')                    // Senha tem que ver se bate com o ConfirmSenha
let confirmSenha = document.getElementById('confirmSenha')
let mensagemValidConfirm = document.getElementById('confirm-valid')
let validSenha = false


const url = "http://localhost:3000"

// Campo com evento que muda a cor do label e input quando atinge uma quantidade específica de caracteres.
// É repetida para usuario, email, senha e confirmar senha.

// o cadastro só é validado quando todas as variáveis de valid forem true 

axios.get(`${url}/users`)
.then((response => {
    const allUsers = response.data

    email.addEventListener('keyup', () => {
        for(let i = 0; i < allUsers.length; i++) {
            if(email.value == allUsers[i].email) {
                email.setAttribute('style', 'border-color: red')
                mensagemValidMail.setAttribute('style', 'color: red')
                mensagemValidMail.innerHTML = 'email já existe'
                validMail = false
            } else {
                email.setAttribute('style', 'border-color: green')
                mensagemValidMail.setAttribute('style', 'color: green')
                mensagemValidMail.innerHTML = 'email válido'
                validMail = true
            }
        }
    })

    confirmSenha.addEventListener('keyup', () => {
        if(senha.value == confirmSenha.value){
            confirmSenha.setAttribute('style', 'border-color: green') 
            mensagemValidConfirm.setAttribute('style', 'color: green')
            mensagemValidConfirm.innerHTML = 'OK'
            validSenha = true

        } else {
            confirmSenha.setAttribute('style', 'border-color: red')
            mensagemValidConfirm.setAttribute('style', 'color: red')
            mensagemValidConfirm.innerHTML = 'Senhas não conferem'
            validSenha = false
        }
    })
}))
.catch(error => console.log(error))

function cadastrar() {
    if(validMail && validSenha) {
        axios.post(`${url}/registrar`, {
            nome1: nome1.value, 
            nome2: nome2.value,
            email: email.value,
            password: senha.value,
            cpf: cpf.value,
            foto_perfil: document.getElementById('fotoPerfil').value,
        })
        .then(() => {
            let html = document.querySelector("*")

            let confirmDiv = document.createElement('div')
            confirmDiv.classList.add("confirm-div")

            let confirmBox = document.createElement('div')
            confirmBox.classList.add("confirm-box")
            
            html.appendChild(confirmDiv)
            
            confirmBox.innerHTML = `
            <button id="close-button" onclick="fechar()">x</button><br>
            <p>Cadastrado com Sucesso</p> <br> <hr>
            <button class="my-button" onclick="fechar()">Ok</button>
                
            `

            confirmDiv.appendChild(confirmBox)
        })
        .catch(error => console.log(error))
    } else {
        let html = document.querySelector("*")

        let confirmDiv = document.createElement('div')
        confirmDiv.classList.add("confirm-div")

        let confirmBox = document.createElement('div')
        confirmBox.classList.add("confirm-box")
        
        html.appendChild(confirmDiv)
        
        confirmBox.innerHTML = `
        <button id="close-button" onclick="fecharMensagemErro()">x</button><br>
        <p>Preencha os campos corretamente</p> <br> <hr>
        <button class="my-button" onclick="fecharMensagemErro()">Ok</button>
            
        `
        confirmDiv.appendChild(confirmBox)
    }
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location = '/login.html'
}

function fecharMensagemErro() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
}


// function cadastrar() {
//     if(validUsuario && validMail && validSenha && validConfirmSenha) { 

//         axios.post(`${url}/register`, {})
//         .then(response => {

//         })
//         .catch(error => console.log(error))

//         let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

//         listaUser.push (
//             {
//                 userCad: usuario.value,
//                 mailCad: email.value,
//                 senhaCad: senha.value

//             }
//         )

//         localStorage.setItem('listaUser', JSON.stringify(listaUser))

//         msgSucess.setAttribute('style', 'display: block')
//         msgSucess.innerHTML = ('<strong>Cadastrando usuário...<strong/>')
//         msgError.setAttribute('style', 'display: none')

//         setTimeout(()=> {
//             alert('Cadastrado com Sucesso!')
//             window.location.href = 'homepage.html'
//         }, 3000)


//     } else {
//         msgError.setAttribute('style', 'display: block')
//         msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
//         msgSucess.setAttribute('style', 'display: none')
//     }
// }

// Fazer validações junto com o banco de dados para ver se existe algum email já parecido, pra isso use o mustache
// assim que tudo for validado corretamente, eles vão entrar no if e a variável "valid" muda pra true. Vamos validar no botão
// cadastrar pra ver se não tem nenhum campo inserido incorretamente e daí cadastrar o usuário