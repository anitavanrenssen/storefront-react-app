import { Component } from "react";
import classes from "./CartTotal.module.css";

class CartTotal extends Component {
  render() {
    const filteredCurrency = this.props.cart.cart.map((product) => {
      return {
        qty: product.qty,
        price: product.prices.find((price) => {
          return price.currency.label === this.props.currency.currency;
        }),
      };
    });

    const amountTotal = filteredCurrency.reduce((accumulator, object) => {
      return accumulator + object.price.amount * object.qty;
    }, 0);
    const totalAmount = amountTotal.toFixed(2);

    const taxAmount = (totalAmount * 0.21).toFixed(2);

    return (
      <div>
        {!this.props.cartModalStyle && <p>Tax 21%: {taxAmount}</p>}
        {!this.props.cartModalStyle && (
          <p>Quantity: {this.props.cart.cart ? this.props.quantity : 0}</p>
        )}
        <div className={`${this.props.cartModalStyle && classes.total}`}>
          <span
            className={
              this.props.cartModalStyle && this.props.cart.cart > 2
                ? classes.totalamount
                : ""
            }
          >
            Total{!this.props.cartModalStyle ? ": " : ""}
          </span>
          <span>{totalAmount}</span>
        </div>
      </div>
    );
  }
}

export default CartTotal;
