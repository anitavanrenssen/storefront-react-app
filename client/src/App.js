import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import Header from "./components/Layout/Header";
import CategoryPage from "./pages/Categories";
import ProductPage from "./pages/Products";
import CartPage from "./pages/Cart";
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
        <Header onShowCart={this.showCartHandler.bind(this)} />
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
