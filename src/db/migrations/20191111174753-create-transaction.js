'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      senderEmail: {
        type: Sequelize.STRING
      },
      recieverEmail: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      otp: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      isSuccess: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};