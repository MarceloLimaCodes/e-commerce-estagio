const url = "http://localhost:3000"

// CADASTRO DE PRODUTO
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

// transformar em base64
const getBase64 = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
}

function cadastrar() {
    /* criar validação pra poder executar a função axios.post */
    
    axios.post(`${url}/categorias/busca`, { 
        nome: document.getElementById('categorias-input').value
    })
    .then(async (response) => {
        let categoriaEncontrada = response.data
        let img1 = document.getElementById('imagem1').files[0];
        let img2 = document.getElementById('imagem2').files[0];
        let img3 = document.getElementById('imagem3').files[0];
        let img4 = document.getElementById('imagem4').files[0];
        let img5 = document.getElementById('imagem5').files[0];

        let render1 = img1 ? await getBase64(img1) : null
        let render2 = img2 ? await getBase64(img2) : null
        let render3 = img3 ? await getBase64(img3) : null
        let render4 = img4 ? await getBase64(img4) : null
        let render5 = img5 ? await getBase64(img5) : null

        axios.post(`${url}/produtos`, {
            nome: document.getElementById('nome').value,
            categoria_id: categoriaEncontrada[0].id,
            sabor: document.getElementById('sabor').value,
            valor: document.getElementById('valor').value,
            quantidade: document.getElementById('quantidade').value,
            desconto: document.getElementById('desconto').value,
            valor_final: document.getElementById('valorFinal').value,
    
            imagem1: render1 ? render1.split(',')[1] : null,
            imagem2: render2 ? render2.split(',')[1] : null,
            imagem3: render3 ? render3.split(',')[1] : null,
            imagem4: render4 ? render4.split(',')[1] : null,
            imagem5: render5 ? render5.split(',')[1] : null,
            
            descricao_curta: document.getElementById('descricaoCurta').value,
            descricao_longa: document.getElementById('descricaoLonga').value,
        })
        .then(() => {
            let html = document.querySelector(".container-scroller")
    
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
        // .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

   
}

function fechar() {
    html = document.querySelector(".container-scroller")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}

// LISTAGEM DE PRODUTOS

