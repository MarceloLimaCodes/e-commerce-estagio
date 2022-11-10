'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        allowNUll: false,
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL'

        /* 
          o valor "CASCADE" faz com que a alteração feita nessa coluna reflita em toda a tabela, caso um update no ID, reflete aqui 

          se setarmos aqui como "CASCADE", assim que deletarmos o valor da categoria, todos os valores da tabela produtos serão apagados também. No caso do "SET NULL", caso a categoria seja deletada, setamos ela como nula sem que a tabela inteira apague que é o caso do "CASCADE"
        */
      },

      valor_total: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      comissao: {
        type: Sequelize.FLOAT,
        allowNUll: false,
      },

      quantidade: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      produto_id: {
        type: Sequelize.INTEGER,
        references: { model: 'produtos', key: 'id' },
        allowNUll: false,
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('links');
    
  }
};
