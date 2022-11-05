const url = "http://localhost:3000"

axios.get(`${url}/clientes`)
.then(response => {
    const template = document.getElementById('template').innerHTML
    document.getElementById('result').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))

function enviar() {
    
}
