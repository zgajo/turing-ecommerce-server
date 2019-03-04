const { verify } = require('jsonwebtoken');

function getUser(context) {
	const Authorization = context && context.request && context.request.headers && context.request.headers.authorization;

	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const verifiedToken = verify(token, process.env.APP_TOKEN_SECRET);

		return verifiedToken;
	}

	return undefined;
}

function tokenCreationData(user) {
	return Object.keys(user).reduce((obj, key) => {
		if (key === 'password') {
			return obj;
		}
		return {
			...obj,
			[key]: user[key],
		};
	}, {});
}

module.exports = {
	getUser,
	tokenCreationData,
};
