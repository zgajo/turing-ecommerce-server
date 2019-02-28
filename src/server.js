const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fs = require('fs');
const { GraphQLServer } = require('graphql-yoga');
const models = require('./models');
const resolvers = require('./resolvers');
const { permissions } = require('./permissions');

const typeDefs = fs.readFileSync(__dirname + '/schema/Schema.gql', 'utf8');

const server = new GraphQLServer({ context: { models }, permissions, resolvers, typeDefs });

server.express.use('/product_images', express.static('product_images'));

server.start();
