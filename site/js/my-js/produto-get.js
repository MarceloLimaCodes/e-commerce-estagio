const searchParam = new URLSearchParams(window.location.search)

let idParam = searchParam.get('id')

axios.get(`${url}/produtos/${idParam}`)
.then(response => {
    let data = response.data
    console.log(data)
    const template = document.getElementById('template-single').innerHTML
    document.getElementById('result-single').innerHTML = Mustache.render(template, data)
})
.catch(error => console.log(error))