const url = "http://localhost:3000"

axios.get(`${url}/banners`)
.then(response => {
    const template = document.getElementById('template-banners').innerHTML
    document.getElementById('result-banners').innerHTML = Mustache.render(template, response)
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
    axios.get(`${url}/banners/${id}`)
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

                            <label for="imagem-edit">imagem (Banner)</label> <br>
                            <input type="file" id="imagem-edit" name="img[]" class="file-upload-default" accept=".jpg, .jpeg, .png"> </input> <br>
                            
                            <label for="observacao-edit">Observação</label> <br>
                            <textarea class="form-control text-area" id="observacao-edit" cols="30" rows="10" placeholder="{{observacao}}"></textarea> <br> <br>
                        </div>

                        <button class="my-button" onclick="confirmarEdicaoBox({{id}})">Ok</button>

                    </script>
                </div>
            </div>
    
            <hr>
        `
    
        confirmDiv.appendChild(confirmBox)
    
        const templateEdit = document.getElementById('template-edit').innerHTML
        document.getElementById('result-edit').innerHTML = Mustache.render(templateEdit, data)
    
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
    let img = document.getElementById('imagem-edit').files[0];

    let render = img ? await getBase64(img) : null

    axios.put(`${url}/banners/${id}`, {
        imagem: render ? render.split(',')[1] : null,
        observacao: document.getElementById('observacao-edit').value
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
    axios.delete(`${url}/banners/${id}`)
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
    axios.get(`${url}/banners/${id}`)
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
        
            <p>Imagem do banner</p> <br> <hr>
            <div id="container-imgs">
                <div id="result-imgs">
                    <script id="template-imgs" type="x-tmpl-mustache" >

                        <div class="img-container">
                            <div>
                                <label>Banner</label> <br>
                                <img class="show-img-banner" src="data:image/jpg;base64,{{imagem}}" alt="">
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
