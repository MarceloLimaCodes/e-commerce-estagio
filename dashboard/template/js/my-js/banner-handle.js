const url = "http://localhost:3000"

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

async function cadastrar() {
    const imgBanner = document.getElementById('imagem').files[0]

    let render = await getBase64(imgBanner)

    axios.post(`${url}/banners`, {
        imagem: render.split(',')[1],
        observacao: document.getElementById('observacao').value
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
    .catch(error => {console.log(error)})
}

function fechar() {
    html = document.querySelector("*")
    html.removeChild(document.querySelector('.confirm-div'))
    window.location.reload()
}