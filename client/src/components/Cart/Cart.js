import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
// import classes from "./Cart.module.css";

class Cart extends Component {
  static contextType = CartContext;

  componentDidMount() {
    // const { cart } = this.context;
  }

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
