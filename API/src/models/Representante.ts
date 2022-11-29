import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Representante extends Model {
    static init(connection: Sequelize) {
        try {
            super.init({
                
                nome: DataTypes.STRING,
                qnt_clientes: DataTypes.INTEGER,
                comissao: DataTypes.FLOAT
                
            }, {
                sequelize: connection
            })
            
        } catch (error) {
            console.log(error)    
        }
        
    }
}