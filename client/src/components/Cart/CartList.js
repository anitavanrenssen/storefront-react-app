import React, { Component } from "react";

import CartItem from "./CartItem";

import { CartContext } from "../../store/contexts";

import classes from "./CartList.module.css";

class CartList extends Component {
  static contextType = CartContext;

  cartItemAddHandler(item) {
    this.context.addItem({ ...item, qty: 1 });
  }
  cartItemRemoveHandler(id) {
    this.context.removeItem(id);
  }

  render() {
    const { cart, cartModalStyle } = this.props;

    return (
      <div className={cartModalStyle ? classes["cart-list"] : ""}>
        {cart &&
          cart.length > 0 &&
          cart.map((product, index) => {
            return (
              <CartItem
                key={index}
                product={product}
                onRemove={this.cartItemRemoveHandler.bind(this, product.id)}
                onAdd={this.cartItemAddHandler.bind(this, product)}
                cartModalStyle={this.props.cartModalStyle}
                cartStyle={this.props.cartStyle}
              />
            );
          })}
      </div>
    );
  }
}

export default CartList;
