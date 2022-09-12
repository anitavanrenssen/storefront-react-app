import { Component } from "react";
import classes from "./PlusMinusButton.module.css";

class PlusMinusButton extends Component {
  render() {
    return (
      <svg
        className={`${
          this.props.cartModalStyle
            ? classes.modalplusminusbutton
            : classes.plusminusbutton
        }`}
        // width="17"
        height="1"
        viewBox="0 0 17 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.5H16"
          stroke="#1D1F22"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
}

export default PlusMinusButton;
