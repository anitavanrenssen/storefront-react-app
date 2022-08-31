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
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify());
  }

  componentDidUpdate() {
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(this.state.cart));
  }

  removeFromCartHandler(id) {
    // const existingCartItemIndex = this.state.cart.findIndex(
    //   (item) => item.id === id
    // );
    // const existingItem = this.state.cart[existingCartItemIndex];
    // // const updatedTotalAmount = this.state.totalAmount - existingItem.price;
    // let updatedItems;
    // if (existingItem.amount === 1) {
    //   updatedItems = this.state.cart.filter((item) => item.id !== id);
    // } else {
    //   const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
    //   updatedItems = [...this.state.cart];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // }
    // return {
    //   cart: updatedItems,
    // };
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem(SHOPPING_CART_KEY)),
    });
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
