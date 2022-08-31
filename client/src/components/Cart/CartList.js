import React, { Component } from "react";
import CartContext from "../../store/cart-context";

import CartItem from "./CartItem";

class CartList extends Component {
  static contextType = CartContext;

  cartItemAddHandler(item) {
    this.context.addItem({ ...item, qty: 1 });
  }
  cartItemRemoveHandler(id) {
    this.context.removeItem(id);
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((product, index) => {
            return (
              <CartItem
                key={index}
                product={product}
                onRemove={this.cartItemRemoveHandler.bind(this, product.id)}
                onAdd={this.cartItemAddHandler.bind(this, product)}
              />
            );
          })}
      </div>
    );
  }
}

export default CartList;
