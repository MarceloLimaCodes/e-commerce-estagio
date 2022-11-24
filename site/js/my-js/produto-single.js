const searchParam = new URLSearchParams(window.location.search)

let idParam = searchParam.get('id')

axios.get(`${url}/produtos/${idParam}`)
.then(response => {
    let data = response.data

    const template = document.getElementById('template-single-nome/descricaoCurta').innerHTML
    document.getElementById('result-single-nome/descricaoCurta').innerHTML = Mustache.render(template, data)

    const template2 = document.getElementById('template-single-descricao').innerHTML
    document.getElementById('result-single-descricao').innerHTML = Mustache.render(template2, data)

    const template3 = document.getElementById('template-single-valor').innerHTML
    document.getElementById('result-single-valor').innerHTML = Mustache.render(template3, data)


    axios.post(`${url}/produtos/categoria`, {
        categoria_id: data.categoria_id
    })
    .then(response => {
        
        const template4 = document.getElementById('template-relacionados').innerHTML
        document.getElementById('result-relacionados').innerHTML = Mustache.render(template4, response)

    })
    .catch(error => console.log(error))

})
.catch(error => console.log(error))


function addCarrinhoSingle(produtoID) {
    let user = JSON.parse(localStorage.getItem('user'))
    let qntValue = document.getElementById('qnt-value')

    axios.post(`${url}/carrinho/busca`, {
        user_id: user.id
    })
    .then(response => {
        let carrinhoData = response.data
        let encontrado = false

        for(let i = 0; i < carrinhoData.length; i++) {
            if(produtoID == carrinhoData[i].produto_id) {
                // Se já tiver um registro do produto no banco, edita-lo adicionando mais 1 a quantidade

                axios.put(`${url}/carrinho/${carrinhoData[i].id}`, {
                    quantidade: carrinhoData[i].quantidade + Number(qntValue.value)
                    // valor_total
                })
                .then(() => {
                    alert('novas quantidades inseridas')
                    location.reload()
                })
                .catch(error => console.log(error))

                encontrado = true

                break
            }
        }

        if(!encontrado) {
            // caso não encontre nenhum registro do prodtudo nesse carrinho, crie um
            axios.post(`${url}/carrinho`, {
                user_id : user.id, 
                produto_id: produtoID, 
                quantidade: Number(qntValue.value), 
                // valor_total 
            })
            .then(() => alert('produto adicionado ao carrinho com sucesso'))
            .catch(error => console.log(error))
        }

    })
}