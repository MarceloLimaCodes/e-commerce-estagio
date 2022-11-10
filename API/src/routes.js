const express = require('express')

const ClienteController = require('./controllers/ClienteController')
const ProdutoController = require('./controllers/ProdutoController')
const CategoriaController = require('./controllers/CategoriaController')
const RepresentanteController = require('./controllers/RepresentanteController')
const LinkController = require('./controllers/LinkController')
const VendaController = require('./controllers/VendaController')

const routes = express.Router()

/* CLIENTES */
routes.get('/clientes', ClienteController.listar)
routes.post('/clientes/busca', ClienteController.buscar)
routes.post('/clientes', ClienteController.criar)
routes.put('/clientes/:id', ClienteController.editar)
routes.delete('/clientes/:id', ClienteController.deletar)

/* CATEGORIAS */
routes.get('/categorias', CategoriaController.listar)
routes.post('/categorias/busca', CategoriaController.buscar)
routes.post('/categorias', CategoriaController.criar)
routes.put('/categorias/:id', CategoriaController.editar)
routes.delete('/categorias/:id', CategoriaController.deletar)

/* PRODUTOS */
routes.get('/produtos', ProdutoController.listar)
routes.post('/produtos/busca', ProdutoController.buscar)
routes.post('/produtos', ProdutoController.criar)
routes.put('/produtos/:id', ProdutoController.editar)
routes.delete('/produtos/:id', ProdutoController.deletar)

/* REPRESENTANTES */
routes.get('/representantes', RepresentanteController.listar)
routes.post('/representantes/busca', RepresentanteController.buscar)
routes.post('/representantes', RepresentanteController.criar)
routes.put('/representantes/:id', RepresentanteController.editar)
routes.delete('/representantes/:id', RepresentanteController.deletar)

// LINKS
routes.get('/links', LinkController.listar)
routes.post('/links', LinkController.criar)
routes.put('/links/:id', LinkController.editar)
routes.delete('/links/:id', LinkController.deletar)

// VENDAS
routes.get('/vendas', VendaController.listar)
routes.post('/vendas/busca', VendaController.buscar)
routes.post('/vendas', VendaController.criar)
routes.put('/vendas/:id', VendaController.editar)
routes.delete('/vendas/:id', VendaController.deletar)


module.exports = routes