var btnPesquisa = document.getElementById('pesquisa')
var search = document.getElementById('search')
var form = document.getElementById('form')

btnPesquisa.addEventListener('click', () => {
    window.location = `./pesquisa.html?search=${search.value}`
})

form.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        e.preventDefault()
        window.location = `./pesquisa.html?search=${search.value}`
    }
})
