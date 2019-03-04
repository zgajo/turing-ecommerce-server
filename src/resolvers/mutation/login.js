import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { tokenCreationData } from '../../utils/token';

module.exports = {
	async login(_, { email, password }, { models }) {
		const customer = await models.Customer.findOne({ where: { email } });

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
