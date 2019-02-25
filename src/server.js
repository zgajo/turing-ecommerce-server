const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const { GraphQLServer } = require('graphql-yoga');
const models = require('./models');
const resolvers = require('./resolvers');
const { permissions } = require('./permissions');

const typeDefs = fs.readFileSync(__dirname + '/schema/Schema.gql', 'utf8');

const server = new GraphQLServer({ context: { models }, permissions, resolvers, typeDefs });

server.start();
