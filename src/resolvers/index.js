const Query = require('./query');
const Types = require('./customTypes');
// import Mutation from './mutation';

const resolvers = {
	// Mutation,
	Query,
	...Types,
};

module.exports = resolvers;
