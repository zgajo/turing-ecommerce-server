const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { tokenCreationData } = require('../../utils/token');

module.exports = {
	async login(_, { email, password }, { models }) {
		const customer = await models.Customer.findOne({ raw: true, where: { email } });

		if (!customer) {
			// No customer for email
			return {
				message: 'Invalid credentials',
				success: false,
			};
		}

		const valid = await compare(password, customer.password);

		if (!valid) {
			// Passwords not match
			return {
				message: 'Invalid credentials',
				success: false,
			};
		}

		return {
			success: true,
			token: sign(tokenCreationData(customer), process.env.TOKEN_SECRET, { expiresIn: '1h' }),
		};
	},
};
