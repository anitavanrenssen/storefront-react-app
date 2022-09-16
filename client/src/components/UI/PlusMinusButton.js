import { Component } from "react";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import classes from "./PlusMinusButton.module.css";

class PlusMinusButton extends Component {
  render() {
    return (
      <Minus
        className={`${
          this.props.cartModalStyle
            ? classes.modalplusminusbutton
            : classes.plusminusbutton
        }`}
      />
    );
  }
}

export default PlusMinusButton;
