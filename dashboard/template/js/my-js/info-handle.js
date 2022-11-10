const url = "http://localhost:3000"

axios.get(`${url}/infos`)
.then(response => {
    const template = document.getElementById('template-infos').innerHTML
    document.getElementById('result-infos').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

function salvar() {
    axios.post(`${url}/infos`, {
        descricao: document.getElementById('descricao').value,
        missao: document.getElementById('missao').value,
        visao: document.getElementById('visao').value,
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
    
            <p>Salvo</p> <br> <hr>
            <button class="my-button" onclick="fechar()">Ok</button>
        `

        confirmDiv.appendChild(confirmBox)
    })
    .catch(error => console.log(error))
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}