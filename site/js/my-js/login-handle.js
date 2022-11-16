let email = document.getElementById('my-email')
let password = document.getElementById('my-password')
let errorMensage = document.getElementById('mensagem-result')

const url = "http://localhost:3000"

function entrar() {
    if(email.value != null && password.value != null) {
        axios.post(`${url}/users/auth`, {
            email: email.value,
            password: password.value
        })
        .then(response => {
            let data = response.data
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            location = "/index.html"

        })
        .catch(error => {
            let resError = error.response.data
            errorMensage.setAttribute('style', 'color: red')
            errorMensage.innerHTML = `${resError.error}`

        })
    }
}


