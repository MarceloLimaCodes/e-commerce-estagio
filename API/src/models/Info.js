const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Info extends Model {
    static init(connection) {
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

module.exports = Info