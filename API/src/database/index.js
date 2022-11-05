const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Cliente = require('../models/Cliente')
const Categoria = require('../models/Categoria')
const Produto = require('../models/Produto')
const Representante = require('../models/Representante')

const connection = new Sequelize(dbConfig)

Cliente.init(connection)
Produto.init(connection)
Categoria.init(connection)
Representante.init(connection)

Produto.associate(connection.models)

module.exports = connection