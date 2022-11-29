import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Link extends Model {
    static init(connection: Sequelize) {
        super.init({
            valor_total: DataTypes.FLOAT,
            comissao: DataTypes.FLOAT,
            quantidade: DataTypes.FLOAT,
        }, {
            sequelize: connection
        })
    }

    static associate(models: any) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' }) 
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' }) 
    }
}