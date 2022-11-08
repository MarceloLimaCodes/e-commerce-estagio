const url = "http://localhost:3000"


/* get nas categorias para preencher a tag option com o mustache  */
axios.get(`${url}/categorias`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))



axios.get(`${url}/categorias`)
.then(response => {
    let data = response.data
    let categoriaInput = document.getElementById('categorias-input')
    let colorResult = document.getElementById('color-result')

    categoriaInput.addEventListener('keyup', () => {
        for(let i = 0; i < data.length; i++) {   
            if(categoriaInput.value == data[i].nome) {
                categoriaInput.setAttribute('style', 'border-color: green')
                colorResult.innerHTML = ''
                break
            } else {
                categoriaInput.setAttribute('style', 'border-color: red')
                colorResult.innerHTML = 'Categoria inexistente'
                colorResult.setAttribute('style', 'color: red')
            }
        }
    })
})
.catch(error => console.log(error))


function cadastrar() {
    /* criar validação pra poder executar a função axios.post */

    /* quando for cadastrar, usar a rota de busca para buscar pelo nome exatamente o id do nome buscado  */
    
    axios.get(`${url}/categorias/busca`, {   /* Trocar no backend para método post pra poder enviar um json */
        nome: document.getElementById('categorias-input').value
    })
    .then(response => {
        let categoriaEncontrada = response.data
        console.log(categoriaEncontrada)
       /*  axios.post(`${url}/produtos`, {
            nome,
            categoria_id: categoriaEncontrada.id,
            sabor,
            valor,
            quantidade,
            desconto,
            valor_final,
    
            imagem1,
            imagem2,
            imagem3,
            imagem4,
            imagem5,
            
            descricao_curta,
            descricao_longa
        })
        .then(response => {
            let data = response.data
    
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
        .catch(error => {console.log(error)}) */
    })
    .catch(error => console.log(error))

   
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
}