'use strict';

module.exports = {
	down: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('customer', 'password', { type: Sequelize.STRING(50) });
	},
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('customer', 'password', { type: Sequelize.STRING(100) });
	},
};
