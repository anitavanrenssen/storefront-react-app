import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import Header from "./components/Layout/Header";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      showCart: false,
    };
  }

  showCartHandler() {
    this.setState((curState) => {
      return { showCart: !curState.showCart };
    });
  }

  hideCartHandler() {
    this.setState((curState) => {
      return { showCart: false };
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.showCart && (
          <Cart onClose={this.hideCartHandler.bind(this)} />
        )}
        <Header client={client} onShowCart={this.showCartHandler.bind(this)} />
        <div>
          <ProductList client={client} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
