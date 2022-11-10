const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Venda extends Model {
    static init(connection) {
        super.init({
            valor: DataTypes.FLOAT,
            comissao: DataTypes.FLOAT,
            status: DataTypes.BOOLEAN,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' }) 
        this.belongsTo(models.Representante, { foreignKey: 'representante_id', as: 'representante' }) 
    }
}

module.exports = Venda