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
    
    axios.post(`${url}/categorias/busca`, { 
        nome: document.getElementById('categorias-input').value
    })
    .then(response => {
        let categoriaEncontrada = response.data

        axios.post(`${url}/produtos`, {
            nome: document.getElementById('nome').value,
            categoria_id: categoriaEncontrada[0].id,
            sabor: document.getElementById('sabor').value,
            valor: document.getElementById('valor').value,
            quantidade: document.getElementById('quantidade').value,
            desconto: document.getElementById('desconto').value,
            valor_final: document.getElementById('valorFinal').value,
    
            imagem1: document.getElementById('imagem1'),
            imagem2: document.getElementById('imagem2'),
            imagem3: document.getElementById('imagem3'),
            imagem4: document.getElementById('imagem4'),
            imagem5: document.getElementById('imagem5'),
            
            descricao_curta: document.getElementById('descricaoCurta').value,
            descricao_longa: document.getElementById('descricaoLonga').value,
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
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

   
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}