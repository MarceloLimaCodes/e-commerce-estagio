const express = require('express')

const ClienteController = require('./controllers/ClienteController')
const ProdutoController = require('./controllers/ProdutoController')
const CategoriaController = require('./controllers/CategoriaController')
const RepresentanteController = require('./controllers/RepresentanteController')
const LinkController = require('./controllers/LinkController')
const VendaController = require('./controllers/VendaController')
const ContatoController = require('./controllers/ContatoController')
const InfoController = require('./controllers/InfoController')
const BannerController = require('./controllers/BannerController')
const UserController = require('./controllers/UserController')
const CarrinhoController = require('./controllers/CarrinhoController')

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
routes.get('/produtos/:id', ProdutoController.buscarUm)
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

// CONTATOS
routes.get('/contatos', ContatoController.listar)
routes.post('/contatos/busca', ContatoController.buscar)
routes.post('/contatos', ContatoController.criar)
routes.put('/contatos/:id', ContatoController.editar)
routes.delete('/contatos/:id', ContatoController.deletar)

// SOBRE NÓS (INFOS)
routes.get('/infos', InfoController.listar)
routes.post('/infos/busca', InfoController.buscar)
routes.post('/infos', InfoController.criar)
routes.put('/infos/:id', InfoController.editar)
routes.delete('/infos/:id', InfoController.deletar)

// BANNER
routes.get('/banners', BannerController.listar)
routes.post('/banners/busca', BannerController.buscar)
routes.post('/banners', BannerController.criar)
routes.put('/banners/:id', BannerController.editar)
routes.delete('/banners/:id', BannerController.deletar)

// USUÁRIO
routes.get('/users', UserController.listar)
routes.post('/users/auth', UserController.autenticar)
routes.post('/users/busca', UserController.buscar)
routes.post('/registrar', UserController.criar)
routes.put('/users/:id', UserController.editar)
routes.delete('/users/:id', UserController.deletar)

// CARRINHO
routes.get('/carrinho', CarrinhoController.listar)
routes.post('/carrinho/busca', CarrinhoController.buscarUm)
routes.post('/carrinho', CarrinhoController.criar)
routes.put('/carrinho/:id', CarrinhoController.editar)
routes.delete('/carrinho/:id', CarrinhoController.deletar)

module.exports = routes