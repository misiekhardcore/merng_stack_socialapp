const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

//GRAPHQL
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

//APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

//DATABASE CONNECTION AND SERVER START
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
