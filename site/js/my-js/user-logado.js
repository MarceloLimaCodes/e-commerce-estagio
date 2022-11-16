let username = document.getElementById('username')
let isAuth = localStorage.getItem('token')
let user = JSON.parse(localStorage.getItem('user'))

username.setAttribute('style', 'cursor: pointer')

if(!isAuth) {
    username.innerText = 'Entrar/Cadastre-se'

    username.addEventListener('click', () => {
        window.location = './login.html'
    })

} else { 
    username.innerText = `${user.nome1}/Sair`

    username.addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location = './index.html'
    })

    // saindo por aqui por enquanto até ajeitar um botão de sair depois de terminar com a criação do carrinho
}
