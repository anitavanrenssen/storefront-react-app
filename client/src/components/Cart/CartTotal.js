import { Component } from "react";

import CurrencySymbol from "../UI/CurrencySymbol";

import classes from "./CartTotal.module.css";

class CartTotal extends Component {
  render() {
    const { cart, quantity, cartStyle, cartModalStyle } = this.props;

    const filteredCurrency = cart.cart.map((product) => {
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
      <div className={cartStyle && classes.total}>
        {!cartModalStyle && (
          <p>
            <CurrencySymbol cartStyle={true} />
            {taxAmount}
          </p>
        )}
        {!cartModalStyle && <p>{cart.cart ? quantity : 0}</p>}
        <p className={cartModalStyle && classes["total-amount"]}>
          <CurrencySymbol />
          {totalAmount}
        </p>
      </div>
    );
  }
}

export default CartTotal;
