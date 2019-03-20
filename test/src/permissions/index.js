// const { rule, shield,  } = require('graphql-shield');
// const { sign } = require('jsonwebtoken');
// const { getUser, tokenCreationData } = require('../utils/token');

// const rules = {
// 	isAdmin: rule()(async (_, __, ctx) => {
// 		const user = getUser(ctx);
// 		const userIdValid = !!user;

// 		if (userIdValid && user !== undefined) {
// 			const userAdmin = await ctx.db.query.user({ where: { id: user.id } });

// 			return userAdmin.admin ? true : false;
// 		}

// 		return false;
// 	}),
// 	isAuthenticated: rule()((_, __, ctx) => {
// 		const user = getUser(ctx);
// 		const userIdValid = !!user;

// 		// refresh  token on every request
// 		if (userIdValid) {
// 			// Giving client accessibility to authorization header
// 			ctx.response.set('Access-Control-Expose-Headers', 'authorization');

// 			ctx.response.set(
// 				'authorization',
// 				sign(
// 					{
// 						// change iat only if we're in  test enviroment
// 						// Doing this because if test token is issued at same second as this creation, it will generate same token and test will break
// 						...(process.env.NODE_ENV === 'test' && { iat: new Date() - 1 }),
// 						...tokenCreationData(user),
// 					},
// 					process.env.APP_TOKEN_SECRET,
// 					{
// 						expiresIn: '1h',
// 					},
// 				),
// 			);
// 		}

// 		return userIdValid;
// 	}),
// };

module.exports = {
	permissions: {},
	//  shield({
	// 	Mutation: {},
	// 	Query: {},
	// }),
};
