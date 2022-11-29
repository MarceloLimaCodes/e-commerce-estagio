import { Sequelize } from "sequelize-typescript"
const { Model, DataTypes } = require('sequelize')

export class Contato extends Model {
    static init(connection: Sequelize) {
        try {
            super.init({
                endereco: DataTypes.STRING,
                email: DataTypes.STRING,
                celular: DataTypes.STRING,
                observacao: DataTypes.STRING,
                site: DataTypes.STRING,
                whatsapp: DataTypes.STRING,
                geo_localizacao: DataTypes.STRING,
            }, {
                sequelize: connection
            })
            
        } catch (error) {
            console.log(error)    
        }
        
    }
}