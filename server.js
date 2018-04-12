// Bare bones Node/Express server
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema");

// This allows us to access the very nice "GraphiQL" interface to test all of our schema logic!
app.use('/graphql', graphqlHTTP({schema, graphiql: true}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');