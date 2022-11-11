'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      id_coluna: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        references: { model: 'representantes', key: 'id' },
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL' 
        
        /* 
          o valor "CASCADE" faz com que a alteração feita nessa coluna reflita em toda a tabela, caso um update no ID, reflete aqui 

          se setarmos aqui como "CASCADE", assim que deletarmos o valor da categoria, todos os valores da tabela produtos serão apagados também. No caso do "SET NULL", caso a categoria seja deletada, setamos ela como nula sem que a tabela inteira apague que é o caso do "CASCADE"
        */
       
      },
      
      nome1: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      nome2: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      
      email: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      password: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      cpf: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      foto_perfil: {
        type: Sequelize.BLOB,
        allowNUll: false
      },

      permissao: {
        type: Sequelize.BOOLEAN,
        allowNUll: false
      },

      ativo: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('users');
    
  }
};
