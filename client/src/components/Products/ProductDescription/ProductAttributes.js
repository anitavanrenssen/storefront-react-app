import React, { Component, Fragment } from "react";

import { CartContext } from "../../../store/contexts";

import classes from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  static contextType = CartContext;

  constructor() {
    super();
    this.state = {
      selectedAttributes: {},
    };
  }

  setSelectedItem(selectedAttributes) {
    const selectedItem = this.props.product.attributes.find((attribute) => {
      return attribute.items.every((item) => {
        return selectedAttributes[item.id] === item.displayValue;
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
        prev[curr.name] = curr.items[0].displayValue;
        return prev;
      },
      {}
    );

    this.setState({
      selectedAttributesObj,
    });
    this.setSelectedItem(selectedAttributesObj);
  }

  render() {
    const { product, cartModalStyle, cartStyle, inStock } = this.props;

    return (
      <Fragment>
        {
          <div className={classes.attributes}>
            {product.attributes.map((attribute) => {
              return (
                <div key={attribute.id}>
                  <h4
                    className={`${
                      cartModalStyle
                        ? classes["modal-attribute-heading"]
                        : classes["attribute-heading"]
                    }`}
                  >
                    {attribute.name}:
                  </h4>
                  <div
                    className={
                      cartModalStyle
                        ? attribute.type === "swatch"
                          ? classes["modal-swatch-buttons"]
                          : classes["modal-text-buttons"]
                        : attribute.type === "swatch"
                        ? classes["swatch-buttons"]
                        : classes["text-buttons"]
                    }
                  >
                    {attribute.items.map((item) => {
                      return (
                        <button
                          key={item.id}
                          id={item.id}
                          value={item.displayValue}
                          name={attribute.name}
                          disabled={!cartStyle && !cartModalStyle && !inStock}
                          className={`${
                            cartModalStyle
                              ? attribute.type === "swatch"
                                ? classes["modal-swatch-button"]
                                : attribute.name !== "Size"
                                ? classes["modal-attribute-button"]
                                : classes["modal-text-button"]
                              : attribute.type === "swatch"
                              ? classes["swatch-button"]
                              : classes["text-button"]
                          } 
                         
                          ${
                            !cartModalStyle &&
                            !cartStyle &&
                            (attribute.type === "swatch") &
                              (this.state.selectedAttributes[attribute.id] ===
                                item.id)
                              ? classes["active-swatch"]
                              : ""
                          } 
                          ${
                            !cartModalStyle &&
                            !cartStyle &&
                            attribute.type === "text" &&
                            this.state.selectedAttributes[attribute.id] ===
                              item.id
                              ? classes["active-text"]
                              : ""
                          }
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF"
                               ? classes["white-swatch-button"]
                               : ""
                           }
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF" &&
                             this.state.selectedAttributes[attribute.id] ===
                               item.id
                               ? classes["active-white-swatch-button"]
                               : ""
                           }
                         
                          `}
                          style={{
                            background:
                              attribute.type === "swatch" && item.value,
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
      </Fragment>
    );
  }
}

export default ProductAttributes;
