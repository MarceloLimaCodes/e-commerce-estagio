const url = "http://localhost:3000"

axios.get(`${url}/vendas`)
.then(response => {
    const template = document.getElementById('template-vendas').innerHTML
    document.getElementById('result-vendas').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

function editar(id) {
    axios.get(`${url}/vendas/${id}`)
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
                            <label for="cliente-select-edit">Cliente</label>
                            <div id="result-clientes-edit"></div> <br>

                            <label for="representante-select-edit">Representante</label>
                            <div id="result-representantes-edit"></div> <br>
                        </div>
                        
                        <div class="input-container">
                            <label for="valor-edit">valor</label> <br>
                            <input id="valor-edit" type="number" placeholder="{{valor}}">  </input> <br>

                            <label for="comissao-edit">comissao</label> <br>
                            <input id="comissao-edit" type="number" placeholder="{{comissao}}">  </input> <br>
                        </div>

                    </div>

                    <button class="my-button" onclick="confirmarEdicaoBox({{id}})">Ok</button>

                </script>
            </div>

            <script id="template-clientes-edit" type="x-tmpl-mustache" >
                <select class="my-select" id="cliente-select-edit">
                    {{#data}}
                        <option>{{nome}}</option>
                    {{/data}}
                </select>
            </script>
            
            <script id="template-representantes-edit" type="x-tmpl-mustache" >
                <select class="my-select" id="representante-select-edit">
                    {{#data}}
                        <option>{{nome}}</option>
                    {{/data}}
                </select>
            </script>

        </div>

        <hr>
    
        `
    
        confirmDiv.appendChild(confirmBox)
    
        const templateEdit = document.getElementById('template-edit').innerHTML
        document.getElementById('result-edit').innerHTML = Mustache.render(templateEdit, data)

        // Buscar clientes cadastrados
        axios.get(`${url}/clientes`)
        .then(response => {
            const template = document.getElementById('template-clientes-edit').innerHTML
            document.getElementById('result-clientes-edit').innerHTML = Mustache.render(template, response)
        })
        .catch(error => console.log(error))

        // Buscar produtos cadastrados
        axios.get(`${url}/representantes`)
        .then(response => {
            const templateProdutos = document.getElementById('template-representantes-edit').innerHTML
            document.getElementById('result-representantes-edit').innerHTML = Mustache.render(templateProdutos, response)
        })
        .catch(error => console.log(error))
    
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
    let selectCliente = document.getElementById("cliente-select-edit");
    let selectRepresentante = document.getElementById("representante-select-edit");

    axios.post(`${url}/clientes/busca`, {
        nome: selectCliente.options[selectCliente.selectedIndex].value
    })
    .then(response => {
        let clienteEncontrado = response.data

        axios.post(`${url}/representantes/busca`, {
            nome: selectRepresentante.options[selectRepresentante.selectedIndex].value
        })
        .then(response => {
            let representanteEncontrado = response.data

            axios.put(`${url}/vendas/${id}`, {
                cliente_id: clienteEncontrado[0].id,
                representante_id: representanteEncontrado[0].id,
                valor: Number(document.getElementById('valor-edit').value),
                comissao: Number(document.getElementById('comissao-edit').value)
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
        })
        .catch(error => console.log(error))
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
    axios.delete(`${url}/vendas/${id}`)
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
