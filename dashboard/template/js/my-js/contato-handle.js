const url = "http://localhost:3000"

axios.get(`${url}/contatos`)
.then(response => {
    const template = document.getElementById('template-contatos').innerHTML
    document.getElementById('result-contatos').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

function salvar() {
    axios.post(`${url}/contatos`, {
        endereco: document.getElementById('endereco').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        observacao: document.getElementById('observacao').value,
        site: document.getElementById('site').value,
        whatsapp: document.getElementById('whatsapp').value,
        geo_localizacao: document.getElementById('geoLocalizacao').value,

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