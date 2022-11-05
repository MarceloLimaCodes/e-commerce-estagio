const { emit } = require('nodemon')
const { Model, DataTypes } = require('sequelize')

class Produto extends Model {
    static init(connection) {
        super.init({
            
            nome: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            sabor: DataTypes.STRING,
            quantidade: DataTypes.FLOAT,
            valor: DataTypes.FLOAT,
            desconto: DataTypes.FLOAT,
            valor_final: DataTypes.FLOAT,

            imagem1: DataTypes.BLOB,
            imagem2: DataTypes.BLOB,
            imagem3: DataTypes.BLOB,
            imagem4: DataTypes.BLOB,
            imagem5: DataTypes.BLOB,

            descricao_curta: DataTypes.STRING,
            descricao_longa: DataTypes.STRING
            
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' }) 
    }
}

module.exports = Produto