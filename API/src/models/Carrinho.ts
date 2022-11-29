import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Carrinho extends Model {
    static init(connection: Sequelize) {
        super.init({
            quantidade: DataTypes.FLOAT,
            valor_total: DataTypes.FLOAT,
        }, {
            sequelize: connection
        })
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }) 
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' }) 
    }
}