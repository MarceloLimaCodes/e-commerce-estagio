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
                    <button class="my-button" onclick="fechar()">Ok</button>
                `

                confirmDiv.appendChild(confirmBox)
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))

    })
    .catch(error => console.log(error))
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}