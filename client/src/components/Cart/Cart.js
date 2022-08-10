import React, { Component } from "react";
import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <Modal onClose={this.props.onClose}>
        <h3>My Bag</h3>
      </Modal>
    );
  }
}

export default Cart;
