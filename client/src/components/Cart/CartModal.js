import { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./CartModal.module.css";
import { CartContext } from "../../store/contexts";
import { CurrencyContext } from "../../store/contexts";
import CartTotal from "./CartTotal";
import Button from "../UI/Button";

class CartModal extends Component {
  static contextType = CartContext;

  // checkOutHandler() {
  //   alert("Checking out...");
  // }

  render() {
    const { cart } = this.context;

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <Modal onClose={this.props.onClose}>
        <div className={classes.modalheading}>
          <span className={classes.bagheading}>My Bag, </span>
          <span className={classes.modalitemamount}>
            {numberOfCartItems} {numberOfCartItems === 1 ? "item" : "items"}
          </span>
        </div>
        <div className={classes.cartlist}>
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
                    quantity={numberOfCartItems}
                    cartModalStyle={true}
                  />
                )}
              </CurrencyContext.Consumer>
            )}
          </CartContext.Consumer>
        </div>

        <div className={classes.cartmodalbuttons}>
          <Link
            to="/cart"
            className={classes.viewbaglink}
            onClick={this.props.onClose}
          >
            <button className={classes.cartmodalviewbagbutton}>View Bag</button>
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
