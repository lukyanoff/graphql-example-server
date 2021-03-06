var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

const logger = {
  log: (entry) => console.log(entry)
};

var schema = require('./data/schema.js');
var resolverMap = require('./data/resolvers');
var graphqlTools = require('graphql-tools');

// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#makeExecutableSchema
const executableSchema = graphqlTools.makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
  logger, // optional
  // allowUndefinedInResolve = false, // optional
  // resolverValidationOptions = {}, // optional
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  rootValue: global,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');