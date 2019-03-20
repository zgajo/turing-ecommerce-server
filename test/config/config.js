const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		database: process.env.DB_NAME,
		dialect: 'mysql',
		host: process.env.DB_HOSTNAME,
		operatorsAliases: false,
		password: process.env.DB_PASSWORD,
		username: process.env.DB_USERNAME,
	},
};
