import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./CartModal.module.css";

class CartModal extends Component {
  render() {
    return (
      <Modal onClose={this.props.onClose}>
        <h3>My Bag</h3>
        <div className={classes.cartlist}>
          <CartList />
        </div>

        <button>
          <Link to="/cart">View Bag</Link>
        </button>
      </Modal>
    );
  }
}

export default CartModal;
