import React, { Component, Fragment } from "react";

import { CartContext } from "../../store/contexts";

import classes from "./CartAttributes.module.css";

class CartAttributes extends Component {
  static contextType = CartContext;

  render() {
    const { product, cartModalStyle } = this.props;
    const { cart } = this.context;

    let cartMap = cart.filter((cartItem) => {
      return cartItem.selectedAttributes === product.selectedAttributes;
    });

    return (
      <Fragment>
        {
          <div>
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
                            attribute.type === "text" &&
                            cartMap[0].selectedAttributes[attribute.id] ===
                              item.id
                              ? classes["selected-cart-attribute"]
                              : ""
                          }
                          ${
                            attribute.type === "swatch" &&
                            cartMap[0].selectedAttributes[attribute.id] ===
                              item.id
                              ? classes["selected-swatch-attribute"]
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
                             cartMap[0].selectedAttributes[attribute.id] ===
                               item.id &&
                             cartModalStyle
                               ? classes["modal-active-white-swatch-button"]
                               : ""
                           }
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF" &&
                             cartMap[0].selectedAttributes[attribute.id] ===
                               item.id &&
                             !cartModalStyle
                               ? classes["active-white-swatch-button"]
                               : ""
                           }`}
                          style={{
                            background:
                              attribute.type === "swatch" && item.value,
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
        }
      </Fragment>
    );
  }
}

export default CartAttributes;
