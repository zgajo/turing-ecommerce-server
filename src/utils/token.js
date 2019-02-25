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
	return {
		id: user.id,
		isAdmin: user.admin,
		name: user.name,
	};
}

module.exports = {
	getUser,
	tokenCreationData,
};
