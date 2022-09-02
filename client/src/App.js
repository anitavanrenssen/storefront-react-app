import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { CartProvider } from "./store/cart-context";
import { CurrencyProvider } from "./store/currency-context";

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

  showCurrencySwitcherHandler() {
    this.setState((curState) => {
      return { showCurrencySwitcher: !curState.showCurrencySwitcher };
    });
  }

  hideCurrencySwitcherHandler() {
    this.setState((curState) => {
      return { showCurrencySwitcher: false };
    });
  }

  getCategoryHandler(category) {
    this.setState({ category: category });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <CartProvider>
          <CurrencyProvider>
            {this.state.showCart && (
              <CartModal onClose={this.hideCartHandler.bind(this)} />
            )}
            {this.state.showCurrencySwitcher && (
              <HeaderCurrencySwitcher
                show={this.state.showCurrencySwitcher}
                onClickOutside={this.hideCurrencySwitcherHandler.bind(this)}
              />
            )}
            <Header
              onShowCart={this.showCartHandler.bind(this)}
              show={this.state.showCurrencySwitcher}
              onShowCurrencySwitcher={this.showCurrencySwitcherHandler.bind(
                this
              )}
              getCategory={this.getCategoryHandler.bind(this)}
            />
            <Switch>
              <Route exact path="/">
                <CategoryPage category={this.state.category} />
              </Route>

              <Route exact path="/product/:id" component={ProductPage} />

              <Route exact path="/cart" component={CartPage} />
            </Switch>
          </CurrencyProvider>
        </CartProvider>
      </ApolloProvider>
    );
  }
}

export default App;
