const Query = require('./query');
const Mutation = require('./mutation');
const Types = require('./customTypes');

// import Mutation from './mutation';

const resolvers = {
	Mutation,
	Query,
	...Types,
};

module.exports = resolvers;
