import { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartList from "./CartList";
import classes from "./CartModal.module.css";
import { CartContext } from "../../store/contexts";
import { CurrencyContext } from "../../store/contexts";
import CartTotal from "./CartTotal";

class CartModal extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <Modal onClose={this.props.onClose}>
        <h3>
          My Bag, {numberOfCartItems}{" "}
          {numberOfCartItems === 1 ? "item" : "items"}
        </h3>
        <div className={classes.cartlist}>
          <CartList cart={cart} />
        </div>
        <div>
          <CartContext.Consumer>
            {(cart) => (
              <CurrencyContext.Consumer>
                {(currency) => (
                  <CartTotal
                    cart={cart}
                    currency={currency}
                    quantity={numberOfCartItems}
                  />
                )}
              </CurrencyContext.Consumer>
            )}
          </CartContext.Consumer>
        </div>

        <button>
          <Link to="/cart">View Bag</Link>
        </button>
      </Modal>
    );
  }
}

export default CartModal;
