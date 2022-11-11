const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Cliente = require('../models/Cliente')
const Categoria = require('../models/Categoria')
const Produto = require('../models/Produto')
const Representante = require('../models/Representante')
const Link = require('../models/Link')
const Venda = require('../models/Venda')
const Contato = require('../models/Contato')
const Info = require('../models/Info')
const Banner = require('../models/Banner')
const User = require('../models/User')

const connection = new Sequelize(dbConfig)

Cliente.init(connection)
Produto.init(connection)
Categoria.init(connection)
Representante.init(connection)
Link.init(connection)
Venda.init(connection)
Contato.init(connection)
Info.init(connection)
Banner.init(connection)
User.init(connection)

Produto.associate(connection.models)
Link.associate(connection.models)
Venda.associate(connection.models)
User.associate(connection.models)

module.exports = connection