import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import CartProvider from "./store/CartProvider";
import CurrencyProvider from "./store/CurrencyProvider";
import CategoryProvider from "./store/CategoryProvider";

// components
import Header from "./components/Layout/Header";
import CategoryPage from "./pages/Categories.page";
import ProductPage from "./pages/Products.page";
import CartPage from "./pages/Cart.page";
import CartModal from "./components/Cart/CartModal";
import HeaderCurrencySwitcher from "./components/Layout/HeaderCurrencySwitcher";

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
      showCurrencySwitcher: false,
    };
  }

  showCartHandler() {
    this.setState((curState) => {
      return { showCart: !curState.showCart };
    });
  }

  hideCartHandler() {
    this.setState(() => {
      return { showCart: false };
    });
  }

  showCurrencySwitcherHandler() {
    this.setState((curState) => {
      return { showCurrencySwitcher: !curState.showCurrencySwitcher };
    });
  }

  hideCurrencySwitcherHandler() {
    this.setState(() => {
      return { showCurrencySwitcher: false };
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <CartProvider>
          <CurrencyProvider>
            {this.state.showCart && (
              <CartModal
                onClose={this.hideCartHandler.bind(this)}
                showCart={this.state.showCart}
              />
            )}
            {this.state.showCurrencySwitcher && (
              <HeaderCurrencySwitcher
                onClose={this.hideCurrencySwitcherHandler.bind(this)}
                onClick={this.hideCurrencySwitcherHandler.bind(this)}
              />
            )}
            <CategoryProvider>
              <Header
                onShowCart={this.showCartHandler.bind(this)}
                show={this.state.showCurrencySwitcher}
                onShowCurrencySwitcher={this.showCurrencySwitcherHandler.bind(
                  this
                )}
              />
              <Switch>
                <Route exact path="/" component={CategoryPage} />

                <Route exact path="/product/:id" component={ProductPage} />

                <Route exact path="/cart" component={CartPage} />
              </Switch>
            </CategoryProvider>
          </CurrencyProvider>
        </CartProvider>
      </ApolloProvider>
    );
  }
}

export default App;
