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
    if (!localStorage.getItem(SHOPPING_CART_KEY)) {
      let cartArray = [];
      cartArray.push(item);
      localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cartArray));
    } else {
      let cartArray = JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));
      cartArray.push(item);
      localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cartArray));
    }
    // this.setState(
    //   (prevState) => ({
    //     cart: [...prevState.cart, item],
    //   }),
    // );
    this.setState({
      cart: JSON.parse(localStorage.getItem(SHOPPING_CART_KEY)),
    });
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
      removeItem: this.removeFromCartHandler,
    };

    return (
      <CartContext.Provider value={cartContext}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
