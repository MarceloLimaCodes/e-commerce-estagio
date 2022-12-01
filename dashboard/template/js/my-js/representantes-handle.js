const url = "http://localhost:3000"

axios.get(`${url}/representantes`)
.then(response => {
    const template = document.getElementById('template-representante').innerHTML
    document.getElementById('result-representante').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

function cadastrar() {
    axios.post(`${url}/representantes`, {
        nome: document.getElementById('nome').value,
        qnt_clientes: document.getElementById('quantidadeClientes').value,
        comissao: document.getElementById('comissao').value
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
    .catch(error => console.log(error))
}


function editar(id) {

    axios.get(`${url}/representantes/${id}`)
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
                            <label for="nome-edit">nome</label> <br>
                            <input id="nome-edit" type="text" placeholder="{{nome}}" > </input> <br>
    
                            <label for="qnt-clientes-edit">quantidade de clientes</label> <br>
                            <input id="qnt-clientes-edit" type="number" placeholder="{{qnt_clientes}}">  </input> <br>
    
                            <label for="comissao-edit">comissão</label> <br>
                            <input id="comissao edit" type="number" placeholder="{{comissao}}">  </input> <br> <hr>

                            <button class="my-button" onclick="confirmarEdicaoBox({{id}})">Ok</button>
                    </script>
                </div>
            </div>
    
    
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
    let nomeEdit = document.getElementById('nome-edit')
    let qntClientesEdit = document.getElementById('qnt-clientes-edit')
    let comissaoEdit = document.getElementById('comissao edit')

    console.log(id, nomeEdit.value, qntClientesEdit.value, comissaoEdit.value)

    axios.put(`${url}/representantes/${id}`, {
        nome: nomeEdit.value,
        qnt_clientes: Number(qntClientesEdit.value),
        comissao: Number(comissaoEdit.value)
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

            <button class="my-button" onclick="fechar()">Ok</button>

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
    axios.delete(`${url}/representantes/${id}`)
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