import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import "./connect.js";
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(8000, () =>{
    console.log(`Running a GraphQL API server at localhost:8000/graphql`)
})