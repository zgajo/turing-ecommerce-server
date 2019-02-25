const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	define: {
		// disable the modification of tablenames; By default, sequelize will automatically
		// transform all passed model names (first parameter of define) into plural.
		// if you don't want that, set the following
		freezeTableName: true,
		timestamps: false,
		underscored: true,
	},
	dialect: 'mysql',
	host: process.env.DB_HOST,
	operatorsAliases: Sequelize.Op, // to ger rid of Sequelize depricate error message
});

const models = {
	Category: sequelize.import('./category'),
	Department: sequelize.import('./department'),
};

Object.keys(models).forEach(modelName => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.op = Sequelize.op;

module.exports = models;
