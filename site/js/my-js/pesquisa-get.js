const url = 'http://localhost:3000'

const searchParam = new URLSearchParams(window.location.search)

let nomeParam = searchParam.get('search')

axios.post(`${url}/produtos/busca`, {
    nome: nomeParam
})
.then(response => {
    const template = document.getElementById('template-produto').innerHTML
    document.getElementById('result-produto').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))


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
            // caso não encontre nenhum registro do produto nesse carrinho, crie um
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
}
