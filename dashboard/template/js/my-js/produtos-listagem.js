const url = "http://localhost:3000"

axios.get(`${url}/produtos`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)
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

function editar(id) {
    axios.get(`${url}/produtos/${id}`)
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
                                <label for="nome-edit">nome</label> <br>
                                <input id="nome-edit" type="text" placeholder="{{nome}}" > </input> <br>

                                <label for="categoria-select">Categoria</label>
                                <div id="result-categorias"></div> <br>
                                
                                <label for="sabor-edit">sabor</label> <br>
                                <input id="sabor-edit" type="text" placeholder="{{sabor}}">  </input> <br>

                                <label for="valor-edit">valor</label> <br>
                                <input id="valor-edit" type="text" placeholder="{{valor}}">  </input> <br>

                                <label for="quantidade-edit">quantidade</label> <br>
                                <input id="quantidade-edit" type="text" placeholder="{{quantidade}}">  </input> <br>

                                <label for="desconto-edit">desconto</label> <br>
                                <input id="desconto-edit" type="text" placeholder="{{desconto}}">  </input> <br>

                                <label for="valor-final-edit">valor_final</label> <br>
                                <input id="valor-final-edit" type="text" placeholder="{{valor_final}}">  </input> <br>
                            </div>
                            
                            <div class="input-container">

                                <label for="imagem1-edit">imagem1 (Capa)</label> <br>
                                <input type="file" id="imagem1-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>
                                
                                <label for="imagem2-edit">imagem2</label> <br>
                                <input type="file" id="imagem2-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>

                                <label for="imagem3-edit">imagem3</label> <br>
                                <input type="file" id="imagem3-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>

                                <label for="imagem4-edit">imagem4</label> <br>
                                <input type="file" id="imagem4-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>

                                <label for="imagem5-edit">imagem5</label> <br>
                                <input type="file" id="imagem5-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>

                                <label for="descricao-curta-edit">descricao Curta</label> <br>
                                <input id="descricao-curta-edit" type="text" placeholder="{{descricao_curta}}">  </input> <br>

                                <label for="descricao-longa-edit">descricao Longa</label> <br>
                                <input id="descricao-longa-edit" type="text" placeholder="{{descricao_longa}}">  </input> <br>
                            </div>

                        </div>

                        <button class="my-button" onclick="confirmarEdicaoBox({{id}})">Ok</button>

                    </script>
                </div>

                <script id="template-categorias" type="x-tmpl-mustache" >
                    <select class="my-select" id="categoria-select">
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

        // Buscar categorias cadastradas
        axios.get(`${url}/categorias`)
        .then(response => {
            const template = document.getElementById('template-categorias').innerHTML
            document.getElementById('result-categorias').innerHTML = Mustache.render(template, response)
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

async function confirmarEdicao(id) {
    var select = document.getElementById("categoria-select")

    axios.post(`${url}/categorias/busca`, { 
        nome: select.options[select.selectedIndex].value
    })
    .then(async (response) => {
        let categoriaEncontrada = response.data

        let img1 = document.getElementById('imagem1-edit').files[0];
        let img2 = document.getElementById('imagem2-edit').files[0];
        let img3 = document.getElementById('imagem3-edit').files[0];
        let img4 = document.getElementById('imagem4-edit').files[0];
        let img5 = document.getElementById('imagem5-edit').files[0];

        let render1 = img1 ? await getBase64(img1) : null
        let render2 = img2 ? await getBase64(img2) : null
        let render3 = img3 ? await getBase64(img3) : null
        let render4 = img4 ? await getBase64(img4) : null
        let render5 = img5 ? await getBase64(img5) : null

        axios.put(`${url}/produtos/${id}`, {
            nome: document.getElementById('nome-edit').value,
            categoria_id: categoriaEncontrada[0].id,
            sabor: document.getElementById('sabor-edit').value,
            valor: document.getElementById('valor-edit').value,
            quantidade: document.getElementById('quantidade-edit').value,
            desconto: document.getElementById('desconto-edit').value,
            valor_final: document.getElementById('valor-final-edit').value,

            imagem1: render1 ? render1.split(',')[1] : null,
            imagem2: render2 ? render2.split(',')[1] : null,
            imagem3: render3 ? render3.split(',')[1] : null,
            imagem4: render4 ? render4.split(',')[1] : null,
            imagem5: render5 ? render5.split(',')[1] : null,
            
            descricao_curta: document.getElementById('descricao-curta-edit').value,
            descricao_longa: document.getElementById('descricao-longa-edit').value,
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
    axios.delete(`${url}/produtos/${id}`)
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

function showImgs(id) {
    axios.get(`${url}/produtos/${id}`)
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
        
            <p>Todas as imagens desse produto </p> <br> <hr>
            <div id="container-imgs">
                <div id="result-imgs">
                    <script id="template-imgs" type="x-tmpl-mustache" >

                        <div class="img-container">
                            <div>
                                <label>imagem 1</label>
                                <img class="show-img" src="data:image/jpg;base64,{{imagem1}}" alt="">
                            </div>
                            <div>
                                <label>imagem 2</label>
                                <img class="show-img" src="data:image/jpg;base64,{{imagem2}}" alt="">
                            </div>
                            <div>
                                <label>imagem 3</label>
                                <img class="show-img" src="data:image/jpg;base64,{{imagem3}}" alt="">
                            </div>
                        </div>
                        <div class="img-container">
                            <div>
                                <label>imagem 4</label>
                                <img class="show-img" src="data:image/jpg;base64,{{imagem4}}" alt="">
                            </div>
                            <div>
                                <label>imagem 5</label>
                                <img class="show-img" src="data:image/jpg;base64,{{imagem5}}" alt="">
                            </div>
                        </div>
                        
                    </script>
                </div>
            </div>
        `
        confirmDiv.appendChild(confirmBox)

        const templateEdit = document.getElementById('template-imgs').innerHTML
        document.getElementById('result-imgs').innerHTML = Mustache.render(templateEdit, data)
    })
    .catch(error => console.log(error))

}
