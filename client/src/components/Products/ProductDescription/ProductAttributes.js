import React, { Component } from "react";
import classes from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  setSelectedItem(selectedAttributes) {
    const selectedItem = this.props.product.attributes.find((attribute) => {
      return attribute.items.every((item) => {
        return selectedAttributes[item.name] === item.value;
      });
    });
    this.setState({
      selectedItem: selectedItem,
    });
    this.props.onAddToCart(this.state);
  }

  attributeSelectHandler(e) {
    const target = e.target;
    const selectedAttributes = this.state.selectedAttributes;
    selectedAttributes[target.name] = target.value;
    this.setSelectedItem(selectedAttributes);
  }

  componentDidMount() {
    const selectedAttributesObj = this.props.product.attributes.reduce(
      (prev, curr, i) => {
        prev[curr.name] = curr.value;
        return prev;
      },
      {}
    );

    this.setState({
      selectedAttributes: selectedAttributesObj,
    });
    this.setSelectedItem(selectedAttributesObj);
  }

  // addToCartHandler() {}
  render() {
    const { product } = this.props;
    return (
      <div>
        {
          <div className={classes.attr}>
            {product.attributes.map((attribute) => {
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
                    {attribute.items.map((item, index) => {
                      return (
                        <button
                          key={item.id}
                          id={item.id}
                          value={item.displayValue}
                          name={attribute.name}
                          className={`${
                            attribute.type === "swatch"
                              ? classes.swatchbutton
                              : classes.sizebutton
                          } 
                          ${
                            item.id === this.state.attributeID &&
                            attribute.type === "swatch" &&
                            classes.activeswatch
                          } ${
                            item.id === this.state.attributeID &&
                            attribute.type === "text" &&
                            classes.activetext
                          }
                          `}
                          style={{
                            background:
                              attribute.type === "swatch" && item.value,
                            border:
                              attribute.type === "swatch" &&
                              item.value === "#FFFFFF" &&
                              "1px solid #1D1F22",
                          }}
                          onClick={this.attributeSelectHandler.bind(this)}
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
        }
      </div>
    );
  }
}

export default ProductAttributes;
