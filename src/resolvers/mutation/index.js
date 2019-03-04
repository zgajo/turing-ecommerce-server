const Signup = require('./signup');
const Login = require('./login');

module.exports = {
	...Login,
	...Signup,
};
