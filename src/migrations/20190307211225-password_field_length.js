'use strict';

module.exports = {
	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
		return queryInterface.changeColumn('customer', 'password', { type: Sequelize.STRING(50) });
	},
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('customer', 'password', { type: Sequelize.STRING(100) });
	},
};
