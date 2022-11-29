import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Info extends Model {
    static init(connection: Sequelize) {
        try {
            super.init({
                descricao: DataTypes.STRING,
                visao: DataTypes.STRING,
                missao: DataTypes.STRING,
            }, {
                sequelize: connection
            })
            
        } catch (error) {
            console.log(error)    
        }
        
    }
}