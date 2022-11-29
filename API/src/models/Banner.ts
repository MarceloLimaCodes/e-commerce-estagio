import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Banner extends Model {
    static init(connection: Sequelize) {
        try {
            super.init({
                imagem: DataTypes.BLOB,
                observacao: DataTypes.STRING,
                
            }, {
                sequelize: connection
            })
            
        } catch (error) {
            console.log(error)    
        }
        
    }
}