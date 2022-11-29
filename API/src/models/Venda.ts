import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Venda extends Model {
    static init(connection: Sequelize) {
        super.init({
            valor: DataTypes.FLOAT,
            comissao: DataTypes.FLOAT,
            status: DataTypes.BOOLEAN,
        }, {
            sequelize: connection
        })
    }

    static associate(models: any) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' }) 
        this.belongsTo(models.Representante, { foreignKey: 'representante_id', as: 'representante' }) 
    }
}