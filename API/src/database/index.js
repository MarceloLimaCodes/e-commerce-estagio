const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Cliente = require('../models/Cliente')
const Categoria = require('../models/Categoria')
const Produto = require('../models/Produto')
const Representante = require('../models/Representante')
const Link = require('../models/Link')
const Venda = require('../models/Venda')

const connection = new Sequelize(dbConfig)

Cliente.init(connection)
Produto.init(connection)
Categoria.init(connection)
Representante.init(connection)
Link.init(connection)
Venda.init(connection)


Produto.associate(connection.models)
Link.associate(connection.models)
Venda.associate(connection.models)

module.exports = connection