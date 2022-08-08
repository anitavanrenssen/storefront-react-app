import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import ProductList from "./components/Products/ProductList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <ProductList client={client} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;