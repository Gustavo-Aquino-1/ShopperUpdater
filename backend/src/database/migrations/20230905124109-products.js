'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      code: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cost_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
      sales_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('products')
  },
}
