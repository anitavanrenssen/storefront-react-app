import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./CartModal.module.css";
import CartContext from "../../store/cart-context";

class CartModal extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <Modal onClose={this.props.onClose}>
        <h3>My Bag, {numberOfCartItems} items</h3>
        <div className={classes.cartlist}>
          <CartList cart={cart} />
        </div>

        <button>
          <Link to="/cart">View Bag</Link>
        </button>
      </Modal>
    );
  }
}

export default CartModal;