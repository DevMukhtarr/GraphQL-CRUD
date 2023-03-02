import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
  type Query {
    message: String
    getUserById(id: ID!): User
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    about: String
  }

  input UserInput {
      name: String
      email: String
      password: String
      confirm_password: String
      about: String
    }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User
  }
`);