const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Link extends Model {
    static init(connection) {
        super.init({
            valor_total: DataTypes.FLOAT,
            comissao: DataTypes.FLOAT,
            quantidade: DataTypes.FLOAT,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' }) 
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' }) 
    }
}

module.exports = Link