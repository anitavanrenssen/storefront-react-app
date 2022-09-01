import React, { Component } from "react";

const CartContext = React.createContext({
  cart: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id) => {},
});

const SHOPPING_CART_KEY = "cart-storage-key";

export class CartProvider extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalAmount: 0,
    };
  }

  addToCartHandler(item) {
    console.log(item.id);
    const updatedTotalAmount =
      this.state.totalAmount + item.prices[0].amount * item.qty;

    const existingCartItemIndex = this.state.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = this.state.cart[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      // console.log(existingCartItem);
      const updatedItem = {
        ...existingCartItem,
        qty: existingCartItem.qty + item.qty,
      };
      updatedItems = [...this.state.cart];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = this.state.cart.concat(item);
    }
    this.setState({ cart: updatedItems, totalAmount: updatedTotalAmount });
  }

  removeFromCartHandler(id) {
    const existingCartItemIndex = this.state.cart.findIndex(
      (item) => item.id === id
    );
    const existingItem = this.state.cart[existingCartItemIndex];

    const updatedTotalAmount =
      this.state.totalAmount - existingItem.prices[0].amount;

    let updatedItems;
    if (existingItem.qty === 1) {
      updatedItems = this.state.cart.filter((item) => item.id !== id);
    } else {
      const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
      updatedItems = [...this.state.cart];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    this.setState({ cart: updatedItems, totalAmount: updatedTotalAmount });
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

export default CartContext;
