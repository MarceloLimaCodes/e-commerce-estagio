const express = require('express')

const ClienteController = require('./controllers/ClienteController')
const ProdutoController = require('./controllers/ProdutoController')
const CategoriaController = require('./controllers/CategoriaController')
const RepresentanteController = require('./controllers/RepresentanteController')

const routes = express.Router()

/* CLIENTES */
routes.get('/clientes', ClienteController.listar)
routes.get('/clientes/busca', ClienteController.buscar)
routes.post('/clientes', ClienteController.criar)
routes.put('/clientes/:id', ClienteController.editar)
routes.delete('/clientes/:id', ClienteController.deletar)

/* CATEGORIAS */
routes.get('/categorias', CategoriaController.listar)
routes.get('/categorias/busca', CategoriaController.buscar)
routes.post('/categorias', CategoriaController.criar)
routes.put('/categorias/:id', CategoriaController.editar)
routes.delete('/categorias/:id', CategoriaController.deletar)

/* PRODUTOS */
routes.get('/produtos', ProdutoController.listar)
routes.get('/produtos/busca', ProdutoController.buscar)
routes.post('/produtos', ProdutoController.criar)
routes.put('/produtos/:id', ProdutoController.editar)
routes.delete('/produtos/:id', ProdutoController.deletar)

/* REPRESENTANTES */
routes.get('/representantes', RepresentanteController.listar)
routes.get('/representantes/busca', RepresentanteController.buscar)
routes.post('/representantes', RepresentanteController.criar)
routes.put('/representantes/:id', RepresentanteController.editar)
routes.delete('/representantes/:id', RepresentanteController.deletar)

module.exports = routes