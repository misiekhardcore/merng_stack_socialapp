import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

const httplink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});

const Apollo = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Apollo;
