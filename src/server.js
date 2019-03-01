const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fs = require('fs');
const { GraphQLServer } = require('graphql-yoga');
const models = require('./models');
const resolvers = require('./resolvers');
const { permissions } = require('./permissions');
const batchFunctions = require('./batch_functions');

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

// client.on('error', function(err) {
// 	console.log('Error ' + err);
// });

let typeDefs = '';
fs.readdirSync(__dirname + '/schema').forEach(file => {
	typeDefs += fs.readFileSync(__dirname + '/schema/' + file, 'utf8');
});

const server = new GraphQLServer({ context: { batchFunctions, models }, permissions, resolvers, typeDefs });

server.express.use('/product_images', express.static('product_images'));

server.start();
