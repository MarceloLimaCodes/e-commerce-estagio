
const url = 'http://localhost:3000'

function getCarrinho() {
    let user = JSON.parse(localStorage.getItem('user'))

    axios.post(`${url}/carrinho/busca`, {
        user_id: user.id
    })
    .then(response => {
        let data = response.data
        
        if(data.length == 0) {
            document.getElementById('carrinho-vazio').setAttribute('style', 'display: block')
            document.getElementById('carrinho-vazio-mensagem').setAttribute('style', 'display: block')

        } else {
            document.getElementById('result-carrinho').setAttribute('style', 'display: block')

            const template = document.getElementById('template-carrinho').innerHTML
            document.getElementById('result-carrinho').innerHTML = Mustache.render(template, response)
        }
    })
    .catch(error => console.log(error))
}


function load() {
    axios.get(`${url}/produtos`)
    .then(response => {
        const template = document.getElementById('template-produto').innerHTML
        document.getElementById('result-produto').innerHTML = Mustache.render(template, response)
    })
    .catch(error => console.log(error))

    getCarrinho()
}    

function addCarrinho(produtoId) {
    // pegar o id do usuário do local storage
    let user = JSON.parse(localStorage.getItem('user'))

    axios.post(`${url}/carrinho/busca`, {
        user_id: user.id
    })
    .then(response => {
        let carrinhoData = response.data
        let encontrado = false

        for(let i = 0; i < carrinhoData.length; i++) {
            if(produtoId == carrinhoData[i].produto_id) {
                // Se já tiver um registro do produto no banco, edita-lo adicionando mais 1 a quantidade

                axios.put(`${url}/carrinho/${carrinhoData[i].id}`, {
                    quantidade: carrinhoData[i].quantidade + 1
                    // valor_total
                })
                .then(() => {
                    alert('mais uma unidade do produto adicionada')
                    location.reload()
                })
                .catch(error => console.log(error))

                encontrado = true

                break
            }
        }

        if(!encontrado) {
            // caso não encontre nenhum registro desse carrinho, crie um
            axios.post(`${url}/carrinho`, {
                user_id : user.id, 
                produto_id: produtoId, 
                quantidade: 1, 
                // valor_total 
            })
            .then(() => alert('produto adicionado ao carrinho'))
            .catch(error => console.log(error))
        }

    })

    // dar um post (pesquisa) nos produtos do usuário específico, se já houver um id produto llá dentro, editar e colocar +1 na quantidade. Se não criar um novo registro no banco
}

function addButton(produtoID, quantidadeData) {
    axios.put(`${url}/carrinho/${produtoID}`, {
        quantidade: quantidadeData + 1
    })
    .then(() => {
        location.reload()
    })
    .catch(error => console.log(error))
}

function removeButton(produtoID, quantidadeData) {
    axios.put(`${url}/carrinho/${produtoID}`, {
        quantidade: quantidadeData - 1
    })
    .then(() => location.reload())
    .catch(error => console.log(error))
}

function removeCart(carrinhoID) {
    let main = document.querySelector("#main")

    let confirmDiv = document.createElement('div')
    confirmDiv.classList.add("confirm-div")

    let confirmBox = document.createElement('div')
    confirmBox.classList.add("confirm-box")
    
    main.appendChild(confirmDiv)
    
    
    confirmBox.innerHTML = `
    <button id="close-button" onclick="fechar()">x</button><br>
    
    <p>Remover esse item do carrinho?</p> <hr>
    <a class="my-button-a" onclick="remover(${carrinhoID})">Remover</a>
    <a class="my-button-a" onclick="fechar()">Cancelar</a> <br>
    
    `
    
    confirmDiv.appendChild(confirmBox)
    
}

function remover(carrinhoID) {
    axios.delete(`${url}/carrinho/${carrinhoID}`)
    .then(() => location.reload())
    .catch(error => console.log(error))
}

function validarLogin() {
    let token = localStorage.getItem("token")
            
    if(!token) {
        let main = document.querySelector("#main")

        let confirmDiv = document.createElement('div')
        confirmDiv.classList.add("confirm-div")

        let confirmBox = document.createElement('div')
        confirmBox.classList.add("confirm-box")
        
        main.appendChild(confirmDiv)
        
        confirmBox.innerHTML = `
        <button id="close-button" onclick="fechar()">x</button><br>

        <p>Não tem uma conta?</p> <hr>
            <a class="my-button-a" href="./login.html" target="_blank">Entrar</a> ou
            <a class="my-button-a" href="./register.html" target="_blank">Registrar</a> <br>
            
        `
            
        confirmDiv.appendChild(confirmBox)
    }
}

function fechar() {
    main = document.querySelector("#main")
    main.removeChild(document.querySelector('.confirm-div'))
}