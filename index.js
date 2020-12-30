const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

//MONGODB
const { MONGODB } = require("./config");

//GRAPHQL
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

//APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//DATABASE CONNECTION AND SERVER START
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
