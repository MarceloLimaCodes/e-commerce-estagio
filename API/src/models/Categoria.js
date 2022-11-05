const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Categoria extends Model {
    static init(connection) {
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

    static associate(models) {
        this.hasOne(models.Produto, { foreignKey: 'categoria_id', as: 'categoria' })
    }
}

module.exports = Categoria