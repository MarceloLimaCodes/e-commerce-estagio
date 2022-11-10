const url = "http://localhost:3000"

axios.get(`${url}/categorias`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))

function cadastrar() {
    axios.post(`${url}/categorias`, {
        nome: document.getElementById('nome').value,
        observacao: document.getElementById('observacao').value
    })
    .then(response => {
        let data = response.data
        /* mandar uma mensagem de ok com o campo cadastrado. */

        let html = document.querySelector("*")

        let confirmDiv = document.createElement('div')
        confirmDiv.classList.add("confirm-div")

        let confirmBox = document.createElement('div')
        confirmBox.classList.add("confirm-box")
        
        html.appendChild(confirmDiv)
        
        confirmBox.innerHTML = `
        <button id="close-button" onclick="fechar()">x</button><br>

        <p>Cadastrado</p> <br> <hr>
        <button class="my-button" onclick="fechar()">Ok</button>
            
        `

        confirmDiv.appendChild(confirmBox)
    })
    .catch(error => {console.log(error)})
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}