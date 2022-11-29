import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Categoria extends Model {
    static init(connection: Sequelize) {
        try {
            super.init({
                
                nome: DataTypes.STRING,
                observacao: DataTypes.STRING
                
            }, {
                sequelize: connection
            })
            
        } catch (error) {
            console.log(error)    
        }
        
    }

    static associate(models: any) {
        this.hasOne(models.Produto, { foreignKey: 'categoria_id', as: 'categoria' })
    }
}