import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import Header from "./components/Layout/Header";
import CategoryPage from "./pages/Categories.page";
import ProductPage from "./pages/Products.page";
import CartPage from "./pages/Cart.page";
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
      category: "all",
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

  getCategoryHandler(category) {
    this.setState({ category: category });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.showCart && (
          <Cart onClose={this.hideCartHandler.bind(this)} />
        )}
        <Header
          onShowCart={this.showCartHandler.bind(this)}
          getCategory={this.getCategoryHandler.bind(this)}
        />
        <Switch>
          <Route exact path="/">
            <CategoryPage category={this.state.category} />
          </Route>

          <Route exact path="/product/:id" component={ProductPage} />

          <Route exact path="/cart" component={CartPage} />
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;
