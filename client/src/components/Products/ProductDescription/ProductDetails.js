import React, { Component } from "react";
import Button from "../../UI/Button";

import classes from "./ProductDetails.module.css";

class ProductDetails extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 className={classes.brandheading}>{this.props.brand}</h2>
          <h3 className={classes.nameheading}>{this.props.name}</h3>
        </div>
        <div>
          {this.props.attributes.length > 0 && (
            <h4 className={classes.attrheading}>
              {this.props.attributes[0].name}:
            </h4>
          )}
          {this.props.attributes.length > 0 && (
            <div className={classes.sizebuttons}>
              {this.props.attributes[0].items.map((item) => {
                return (
                  <button
                    key={item.id}
                    value={item.displayValue}
                    className={classes.sizebutton}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <h4 className={classes.attrheading}>Price:</h4>
          <div className={classes.price}>
            <span>{this.props.prices[0].currency.symbol}</span>
            <span>{this.props.prices[0].amount}</span>
          </div>
        </div>
        <Button>Add to cart</Button>
        <div className={classes.description}>{this.props.description}</div>
      </div>
    );
  }
}

export default ProductDetails;
