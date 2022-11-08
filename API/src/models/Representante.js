const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Representante extends Model {
    static init(connection) {
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

module.exports = Representante