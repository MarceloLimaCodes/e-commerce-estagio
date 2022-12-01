const url = "http://localhost:3000"


// CADASTRO DE LINK
// axios.post(`${url}/cliente/busca`, { 
//     nome: document.getElementById('cliente-select').value
// })
// .then(response => {
//     console.log(response)
// })
// .catch(error => console.log(error))



// RENDER MUSTACHE PARA BUSCAR CLIENTES CADASTRADOS
axios.get(`${url}/clientes`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)

    // var select = document.getElementById("cliente-select")               <- select pra poder pegar o valor selecionado na hora do cadastro
    // var opcaoValor = select.options[select.selectedIndex].value;
})
.catch(error => console.log(error))


// RENDER MUSTACHE PARA BUSCAR PRODUTOS CADASTRADOS
axios.get(`${url}/produtos`)
.then(response => {
    const template = document.getElementById('template-produtos').innerHTML
    document.getElementById('result-produtos').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

// RENDER MUSTACHE PARA PEGAR TODOS OS LINKS E REFLETIR DEPOIS DO CADASTRO
axios.get(`${url}/links`)
.then(response => {
    const template = document.getElementById('template-links').innerHTML
    document.getElementById('result-links').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))

function cadastrar() {
    var select = document.getElementById("cliente-select");

    axios.post(`${url}/clientes/busca`, {
        nome: select.options[select.selectedIndex].value
    })
    .then(response => {
        const clienteEncontrado = response.data
        const selectProduto = document.getElementById("produto-select")

        axios.post(`${url}/produtos/busca`, {
            nome: selectProduto.options[selectProduto.selectedIndex].value
        })
        .then(response => {
            const produtoEncontrado = response.data

            axios.post(`${url}/links`, {
                cliente_id: clienteEncontrado[0].id,
                produto_id: produtoEncontrado[0].id,
                valor_total: document.getElementById('valor-total').value,
                comissao: document.getElementById('comissao').value,
                quantidade: document.getElementById('quantidade').value
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

function editar(id) {
    axios.get(`${url}/links/${id}`)
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

                                <label for="produto-select-edit">Produto</label>
                                <div id="result-produtos-edit"></div> <br>

                                <label for="valor-total-edit">sabor</label> <br>
                                <input id="valor-total-edit" type="number" placeholder="{{valor_total}}">  </input> <br>

                            </div>
                            
                            <div class="input-container">

                                <label for="comissao-edit">comissao</label> <br>
                                <input id="comissao-edit" type="number" placeholder="{{comissao}}">  </input> <br>

                                <label for="quantidade-edit">quantidade</label> <br>
                                <input id="quantidade-edit" type="number" placeholder="{{quantidade}}">  </input> <br>
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
                
                <script id="template-produtos-edit" type="x-tmpl-mustache" >
                    <select class="my-select" id="produto-select-edit">
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
        axios.get(`${url}/produtos`)
        .then(response => {
            const templateProdutos = document.getElementById('template-produtos-edit').innerHTML
            document.getElementById('result-produtos-edit').innerHTML = Mustache.render(templateProdutos, response)
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
    let selectProduto = document.getElementById("produto-select-edit");

    axios.post(`${url}/clientes/busca`, {
        nome: selectCliente.options[selectCliente.selectedIndex].value
    })
    .then(response => {
        let clienteEncontrado = response.data

        axios.post(`${url}/produtos/busca`, {
            nome: selectProduto.options[selectProduto.selectedIndex].value
        })
        .then(response => {
            const produtoEncontrado = response.data

            axios.put(`${url}/links/${id}`, {
                cliente_id: clienteEncontrado[0].id,
                produto_id: produtoEncontrado[0].id,
                valor_total: Number(document.getElementById('valor-total-edit').value),
                comissao: Number(document.getElementById('comissao-edit').value),
                quantidade: Number(document.getElementById('quantidade-edit').value)
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
    })
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
    axios.delete(`${url}/links/${id}`)
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