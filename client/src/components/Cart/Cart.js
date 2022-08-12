import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <Modal onClose={this.props.onClose}>
        <h3>My Bag</h3>
       
        <button>
          <Link to="/cart">View Bag</Link>
        </button>
      </Modal>
    );
  }
}

export default Cart;
