const url = "http://localhost:3000"

axios.get(`${url}/clientes`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))

function cadastrar() {
    axios.post(`${url}/clientes`, {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        estado: document.getElementById('estado').value,
        cpf: document.getElementById('cpf').value,
        whatsapp: document.getElementById('whatsapp').value,
        cep: document.getElementById('cep').value,
        numero: document.getElementById('numero').value,
        cidade: document.getElementById('cidade').value,
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

        <p>Enviado</p> <br> <hr>
        <button class="my-button" onclick="fechar()">Ok</button>
            
        `

        confirmDiv.appendChild(confirmBox)
    })
    .catch(error => {console.log(error)})
}



function editar(id) {

    axios.get(`${url}/clientes/${id}`)
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
                                <label for="nome-edit">nome</label> <br>
                                <input id="nome-edit" type="text" placeholder="{{nome}}" > </input> <br>
                                <label for="email-edit">email</label> <br>
                                <input id="email-edit" type="text" placeholder="{{email}}">  </input> <br>
                                <label for="celular-edit">celular</label> <br>
                                <input id="celular-edit" type="text" placeholder="{{celular}}">  </input> <br>
                                <label for="rua-edit">rua</label> <br>
                                <input id="rua-edit" type="text" placeholder="{{rua}}">  </input> <br>
                                <label for="bairro-edit">bairro</label> <br>
                                <input id="bairro-edit" type="text" placeholder="{{bairro}}">  </input> <br>
                                <label for="estado-edit">estado</label> <br>
                                <input id="estado-edit" type="text" placeholder="{{estado}}">  </input> <br>
                            </div>
                            
                            <div class="input-container">
                                <label for="cpf-edit">cpf</label> <br>
                                <input id="cpf-edit" type="text" placeholder="{{cpf}}">  </input> <br>
                                <label for="whatsapp-edit">whatsapp</label> <br>
                                <input id="whatsapp-edit" type="text" placeholder="{{whatsapp}}">  </input> <br>
                                <label for="cep-edit">cep</label> <br>
                                <input id="cep-edit" type="text" placeholder="{{cep}}">  </input> <br>
                                <label for="numero-edit">numero</label> <br>
                                <input id="numero-edit" type="text" placeholder="{{numero}}">  </input> <br>
                                <label for="cidade-edit">cidade</label> <br>
                                <input id="cidade-edit" type="text" placeholder="{{cidade}}">  </input> <br>
                                <label for="observacao-edit">observacao</label> <br>
                                <input id="observacao-edit" type="text" placeholder="{{observacao}}">  </input> <br>
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

    axios.put(`${url}/clientes/${id}`, {
        nome: document.getElementById('nome-edit').value,
        email: document.getElementById('email-edit').value,
        celular: document.getElementById('celular-edit').value,
        rua: document.getElementById('rua-edit').value,
        bairro: document.getElementById('bairro-edit').value,
        estado: document.getElementById('estado-edit').value,
        cpf: document.getElementById('cpf-edit').value,
        whatsapp: document.getElementById('whatsapp-edit').value,
        cep: document.getElementById('cep-edit').value,
        numero: document.getElementById('numero-edit').value,
        cidade: document.getElementById('cidade-edit').value,
        observacao: document.getElementById('observacao-edit').value
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
    axios.delete(`${url}/clientes/${id}`)
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

