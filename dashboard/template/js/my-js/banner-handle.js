const url = "http://localhost:3000"

function cadastrar() {
    axios.post(`${url}/banners`, {
        imagem: document.getElementById('imagem').value,
        observacao: document.getElementById('observacao').value
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