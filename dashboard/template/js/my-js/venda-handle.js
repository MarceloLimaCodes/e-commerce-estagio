const url = "http://localhost:3000"

axios.get(`${url}/vendas`)
.then(response => {
    const template = document.getElementById('template-vendas').innerHTML
    document.getElementById('result-vendas').innerHTML = Mustache.render(template, response)

})
.catch(error => console.log(error))