const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Carrinho extends Model {
    static init(connection) {
        super.init({
            quantidade: DataTypes.FLOAT,
            valor_total: DataTypes.FLOAT,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }) 
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' }) 
    }
}

module.exports = Carrinho