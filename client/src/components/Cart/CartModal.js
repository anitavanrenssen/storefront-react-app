import { Component } from "react";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import Button from "../UI/Button";

import { CartContext } from "../../store/contexts";
import { CurrencyContext } from "../../store/contexts";

import classes from "./CartModal.module.css";

class CartModal extends Component {
  static contextType = CartContext;

  componentDidMount() {
    if (this.props.showCart) {
      // Get the current page scroll position
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      // if any scroll is attempted, set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }
  }

  componentWillUnmount() {
    window.onscroll = function () {};
  }

  render() {
    const { cart, totalCartItems } = this.context;

    return (
      <Modal onClose={this.props.onClose}>
        <div className={classes["modal-heading"]}>
          <span className={classes["bag-heading"]}>My Bag, </span>
          <span className={classes["items-amount"]}>
            {totalCartItems} {totalCartItems === 1 ? "item" : "items"}
          </span>
        </div>
        <div className={classes["cart-list"]}>
          <CartList cart={cart} cartModalStyle={true} />
        </div>
        <div className={classes.total}>
          <p>Total</p>
          <CartContext.Consumer>
            {(cart) => (
              <CurrencyContext.Consumer>
                {(currency) => (
                  <CartTotal
                    cart={cart}
                    currency={currency}
                    quantity={totalCartItems}
                    cartModalStyle={true}
                  />
                )}
              </CurrencyContext.Consumer>
            )}
          </CartContext.Consumer>
        </div>

        <div className={classes["cart-modal-buttons"]}>
          <Link
            to="/cart"
            className={classes["view-bag-link"]}
            onClick={this.props.onClose}
          >
            <button className={classes["view-bag-button"]}>View Bag</button>
          </Link>

          <Button
            onClick={this.props.onClose}
            inStock={true}
            cartModalStyle={true}
          >
            Check out
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CartModal;
