const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    username: String!
    token: String!
    email: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassoword: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput): User!
  }
`;
