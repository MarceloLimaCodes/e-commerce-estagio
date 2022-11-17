'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carrinhos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL'
      },

      produto_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        references: { model: 'produtos', key: 'id' },
        onUpdate: 'CASCADE',   
        onDelete: 'SET NULL' 
      },

      quantidade: {
        type: Sequelize.FLOAT,
        allowNUll: false
      },

      valor_total: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('carrinhos');
    
  }
};
