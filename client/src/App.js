import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import Header from "./components/Layout/Header";
import CategoryPage from "./pages/Categories.page";
// import ProductPage from "./pages/Products.page";
import CartPage from "./pages/Cart.page";
import Cart from "./components/Cart/Cart";
import ProductDescription from "./components/Products/ProductDescription/ProductDescription";
// import CategoryContext from "./store/categories-context";

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
        <Switch>
          <Route path="/" exact>
            <CategoryPage />
          </Route>
          <Route path="/product/:id">
            <ProductDescription />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;
