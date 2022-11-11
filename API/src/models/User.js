const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init({
            
            nome1: DataTypes.STRING,
            nome2: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            cpf: DataTypes.STRING,
            foto_perfil: DataTypes.BLOB,
            permissao: DataTypes.BOOLEAN,
            ativo: DataTypes.BOOLEAN,
            
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Representante, { foreignKey: 'id_coluna', as: 'representante' }) 
    }
}

module.exports = User