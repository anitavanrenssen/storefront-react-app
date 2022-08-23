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
            <div className={classes.attr}>
              {this.props.attributes.map((attribute) => {
                return (
                  <div key={attribute.id} className={classes.attrblock}>
                    <h4 className={classes.attrheading}>{attribute.name}:</h4>
                    <div
                      className={
                        attribute.type === "swatch"
                          ? classes.swatchbuttons
                          : classes.sizebuttons
                      }
                    >
                      {attribute.items.map((item) => {
                        return (
                          <button
                            key={item.id}
                            value={item.displayValue}
                            className={
                              attribute.type === "swatch"
                                ? classes.swatchbutton
                                : classes.sizebutton
                            }
                            style={{
                              background:
                                attribute.type === "swatch" && item.value,
                              border:
                                attribute.type === "swatch" &&
                                item.value === "#FFFFFF" &&
                                "1px solid #1D1F22",
                            }}
                          >
                            {attribute.type === "swatch" ? "" : item.value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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
        <Button>{!this.props.inStock ? "Out of stock" : "Add to cart"}</Button>
        <div className={classes.description}>{this.props.description}</div>
      </div>
    );
  }
}

export default ProductDetails;
