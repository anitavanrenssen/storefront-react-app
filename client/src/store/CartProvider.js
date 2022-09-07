import React, { Component } from "react";
import { CartContext } from "./contexts";

const SHOPPING_CART_KEY = "cart-storage-key";

class CartProvider extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalAmount: 0,
    };
  }

  updatedTotalAmount(amount) {
    this.setState({ totalAmount: amount });
  }

  addToCartHandler(item) {
    console.log(item);
    // const updatedTotalAmount =
    //   this.state.totalAmount + item.prices[0].amount * item.qty;

    const existingCartItemIndex = this.state.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = this.state.cart[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        qty: existingCartItem.qty + item.qty,
      };
      updatedItems = [...this.state.cart];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = this.state.cart.concat(item);
    }
    this.setState({ cart: updatedItems });
  }

  removeFromCartHandler(id) {
    const existingCartItemIndex = this.state.cart.findIndex(
      (item) => item.id === id
    );
    const existingItem = this.state.cart[existingCartItemIndex];

    // const updatedTotalAmount =
    //   this.state.totalAmount - existingItem.prices[0].amount;

    let updatedItems;
    if (existingItem.qty === 1) {
      updatedItems = this.state.cart.filter((item) => item.id !== id);
    } else {
      const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
      updatedItems = [...this.state.cart];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    this.setState({ cart: updatedItems });
  }

  componentDidUpdate() {
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(this.state));
  }

  componentDidMount() {
    if (localStorage.getItem(SHOPPING_CART_KEY)) {
      let data = JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));
      let cart = data.cart;
      let totalAmount = data.totalAmount;
      this.setState({
        cart: cart,
        totalAmount: totalAmount,
      });
    }
  }

  render() {
    const cartContext = {
      cart: this.state.cart,
      totalAmount: this.state.totalAmount,
      updateTotalAmount: this.updatedTotalAmount.bind(this),
      addItem: this.addToCartHandler.bind(this),
      removeItem: this.removeFromCartHandler.bind(this),
    };

    return (
      <CartContext.Provider value={cartContext}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
