const url = "http://localhost:3000"

axios.get(`${url}/banners`)
.then(response => {
    const template = document.getElementById('template-banners').innerHTML
    document.getElementById('result-banners').innerHTML = Mustache.render(template, response)
})
.catch(error => console.log(error))