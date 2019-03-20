'use strict';

module.exports = {
	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			queryInterface.removeColumn('customer', 'facebook_id', { transaction });
			queryInterface.removeColumn('customer', 'google_id', { transaction });
			queryInterface.removeColumn('customer', 'method', { transaction });
			queryInterface.changeColumn(
				'customer',
				'password',
				{ allowNull: false, type: Sequelize.STRING(100) },
				{ transaction },
			);

			await transaction.commit();
			return Promise.resolve();
		} catch (error) {
			await transaction.rollback();
			return Promise.reject();
		}
	},

	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(transaction =>
			Promise.all([
				queryInterface.addColumn('customer', 'facebook_id', { type: Sequelize.STRING }, { transaction }),
				queryInterface.addColumn('customer', 'google_id', { type: Sequelize.STRING }, { transaction }),
				queryInterface.addColumn(
					'customer',
					'method',
					{
						enum: ['local', 'google', 'facebook'],
						required: true,
						type: Sequelize.STRING(20),
					},
					{ transaction },
				),
				queryInterface.changeColumn(
					'customer',
					'password',
					{ allowNull: true, type: Sequelize.STRING(100) },
					{ transaction },
				),
			]),
		);
	},
};
