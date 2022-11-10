const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Banner extends Model {
    static init(connection) {
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

module.exports = Banner