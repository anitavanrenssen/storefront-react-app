import React, { Component } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

class CartList extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;
    return (
      <div>
        {cart.length > 0 &&
          cart.map((product, index) => {
            return <CartItem key={index} product={product} />;
          })}
      </div>
    );
  }
}

export default CartList;
