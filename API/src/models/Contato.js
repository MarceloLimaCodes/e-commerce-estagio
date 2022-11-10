const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Contato extends Model {
    static init(connection) {
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

module.exports = Contato