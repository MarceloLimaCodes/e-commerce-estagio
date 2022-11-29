import { Sequelize } from 'sequelize-typescript';

import { Cliente } from '../models/Cliente'
import { Categoria } from '../models/Categoria'
import { Produto } from '../models/Produto'
import { Representante } from '../models/Representante'
import { Link } from '../models/Link'
import { Venda } from '../models/Venda'
import { Contato } from '../models/Contato'
import { Info } from '../models/Info'
import { Banner } from '../models/Banner'
import { User } from '../models/User'
import { Carrinho } from '../models/Carrinho'


const dbConfig = require('../config/database')
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
Carrinho.init(connection)

Produto.associate(connection.models)
Link.associate(connection.models)
Venda.associate(connection.models)
User.associate(connection.models)
Carrinho.associate(connection.models)

module.exports = connection