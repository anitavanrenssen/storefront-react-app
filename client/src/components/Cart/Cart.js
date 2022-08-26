import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
// import classes from "./Cart.module.css";

// const SHOPPING_CART_KEY = "cart-storage-key";

class Cart extends Component {
  static contextType = CartContext;

  // componentDidMount() {
  //   const cart = JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));
  //   return cart;
  // }

  render() {
    const { cart } = this.context;
    console.log(cart);

    return (
      <Modal onClose={this.props.onClose}>
        <h3>My Bag</h3>

        {cart.map((product, index) => {
          return (
            <div key={index}>
              <span>{product.itemName}</span>
              <span>{product.brand}</span>
            </div>
          );
        })}

        <button>
          <Link to="/cart">View Bag</Link>
        </button>
      </Modal>
    );
  }
}

export default Cart;
