'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      nome: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      ativo: {
        type: Sequelize.BOOLEAN,
        allowNUll: false
      },

      categoria_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        references: { model: 'categoria', key: 'id' },
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL' 
        
        /* 
          o valor "CASCADE" faz com que a alteração feita nessa coluna reflita em toda a tabela, caso um update no ID, reflete aqui 

          se setarmos aqui como "CASCADE", assim que deletarmos o valor da categoria, todos os valores da tabela produtos serão apagados também. No caso do "SET NULL", caso a categoria seja deletada, setamos ela como nula sem que a tabela inteira apague que é o caso do "CASCADE"
        */
       
      },

      sabor: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      quantidade: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      valor: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      desconto: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      valor_final: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },


      imagem1: {
        type: Sequelize.BLOB('long'),
        allowNUll: true
      },
      imagem2: {
        type: Sequelize.BLOB('long'),
        allowNUll: true
      },
      imagem3: {
        type: Sequelize.BLOB('long'),
        allowNUll: true
      },
      imagem4: {
        type: Sequelize.BLOB('long'),
        allowNUll: true
      },
      imagem5: {
        type: Sequelize.BLOB('long'),
        allowNUll: true
      },


      descricao_curta: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      descricao_longa: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNUll: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false
      }
      
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
    
  }
};
