const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { capitalize } = require('../utils/globals');
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

// const models = {
// 	Category: sequelize.import('./category'),
// 	Department: sequelize.import('./department'),
// };
const models = {};
fs.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach(file => {
		const model = sequelize['import'](path.join(__dirname, file));
		let modelName = model.name;
		models[capitalize(modelName)] = model;
	});

Object.keys(models).forEach(modelName => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.op = Sequelize.op;

module.exports = models;
