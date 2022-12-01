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

function editar(id) {

    axios.get(`${url}/contatos/${id}`)
    .then((response) => {
        let data = response.data

        let html = document.querySelector("*")
    
        let confirmDiv = document.createElement('div')
        confirmDiv.classList.add("confirm-div")
    
        let confirmBox = document.createElement('div')
        confirmBox.classList.add("confirm-box")
        
        html.appendChild(confirmDiv)
        
        confirmBox.innerHTML = `
            <button id="close-button" onclick="fechar()">x</button><br>
    
            <p>Editar </p> <br> <hr>
            
            <div class="container-edit">
                <div id="result-edit">
                    <script id="template-edit" type="x-tmpl-mustache">
                        <div class="all-inputs">
                            <div class="input-container">
                                <label for="endereco-edit">endereco</label> <br>
                                <input id="endereco-edit" type="text" placeholder="{{endereco}}" > </input> <br>
        
                                <label for="email-edit">email</label> <br>
                                <input id="email-edit" type="text" placeholder="{{email}}">  </input> <br>
        
                                <label for="celular-edit">celular</label> <br>
                                <input id="celular-edit" type="text" placeholder="{{celular}}">  </input> <br>
        
                                <label for="observacao-edit">observacao</label> <br>
                                <input id="observacao-edit" type="text" placeholder="{{observacao}}">  </input> <br>
                            </div>

                            <div class="input-container">
                                <label for="site-edit">site</label> <br>
                                <input id="site-edit" type="text" placeholder="{{site}}">  </input> <br>
        
                                <label for="whatsapp-edit">whatsapp</label> <br>
                                <input id="whatsapp-edit" type="text" placeholder="{{whatsapp}}">  </input> <br>
        
                                <label for="geo-localizacao-edit">geo localizacao</label> <br>
                                <input id="geo-localizacao-edit" type="text" placeholder="{{geo_localizacao}}">  </input> <br>
                            </div>
                        </div>
                        
                        <button class="my-button" onclick="confirmarEdicaoBox({{id}})">Ok</button>

                    </script>
                </div>
            </div>

            <hr>
    
        `
    
        confirmDiv.appendChild(confirmBox)
    
        const templateEdit = document.getElementById('template-edit').innerHTML
        document.getElementById('result-edit').innerHTML = Mustache.render(templateEdit, data)
    
    })
    .catch(error => console.log(error))

}

function confirmarEdicaoBox(id) {
    let html = document.querySelector("*")

    let confirmDiv = document.createElement('div')
    confirmDiv.classList.add("confirm-div")
    confirmDiv.setAttribute("id", "confirm-div-edit")

    let confirmBox = document.createElement('div')
    confirmBox.classList.add("confirm-box")
    confirmDiv.setAttribute("id", "confirm-box-edit")
    
    html.appendChild(confirmDiv)
    
    confirmBox.innerHTML = `
        <button id="close-button" onclick="fecharBoxConfirmEdit()">x</button><br>
    
        <p>Confirmar edição?</p> <br> <hr>

        <button class="my-button" onclick="confirmarEdicao(${id})">Confirmar</button>

    `

    confirmDiv.appendChild(confirmBox)
}

function confirmarEdicao(id) {

    axios.put(`${url}/contatos/${id}`, {
        endereco: document.getElementById('endereco-edit').value,
        email: document.getElementById('email-edit').value,
        celular: document.getElementById('celular-edit').value,
        observacao: document.getElementById('observacao-edit').value,
        site: document.getElementById('site-edit').value,
        whatsapp: document.getElementById('whatsapp-edit').value,
        geo_localizacao: document.getElementById('geo-localizacao-edit').value,
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
        
            <p>Registro editado com sucesso</p> <br> <hr>

            <button class="my-button" onclick="fecharRecarregar()">Ok</button>

        `
        confirmDiv.appendChild(confirmBox)
    })
    .catch(error => console.log(error))
}

function fecharRecarregar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
}

function fecharBoxConfirmEdit() {
    html = document.querySelector("*")
    html.removeChild(document.getElementById('confirm-box-edit'))
}


function apagarConfirm(id) {
    let html = document.querySelector("*")

    let confirmDiv = document.createElement('div')
    confirmDiv.classList.add("confirm-div")

    let confirmBox = document.createElement('div')
    confirmBox.classList.add("confirm-box")
    
    html.appendChild(confirmDiv)
    
    confirmBox.innerHTML = `
        <button id="close-button" onclick="fechar()">x</button><br>
    
        <p>Tem certeza que quer apagar esse registro?</p> <br> <hr>

        <button class="my-button" onclick="apagar(${id})">Ok</button>

    `
    confirmDiv.appendChild(confirmBox)

}

function apagar(id) {
    axios.delete(`${url}/contatos/${id}`)
    .then(() => {
        let html = document.querySelector("*")

        let confirmDiv = document.createElement('div')
        confirmDiv.classList.add("confirm-div")
    
        let confirmBox = document.createElement('div')
        confirmBox.classList.add("confirm-box")
        
        html.appendChild(confirmDiv)
        
        confirmBox.innerHTML = `
            <button id="close-button" onclick="fechar()">x</button><br>
        
            <p>Registro Apagado</p> <br> <hr>
    
            <button class="my-button" onclick="fecharRecarregar()">Ok</button>
    
        `
        confirmDiv.appendChild(confirmBox)
    })
    .catch(error => console.log(error))
}