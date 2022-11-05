const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Cliente extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            celular: DataTypes.STRING,
            rua: DataTypes.STRING,
            bairro: DataTypes.STRING,
            estado: DataTypes.STRING,
            cpf: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            cep: DataTypes.STRING,
            numero: DataTypes.STRING,
            cidade: DataTypes.STRING,
            observacao: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }
}

module.exports = Cliente