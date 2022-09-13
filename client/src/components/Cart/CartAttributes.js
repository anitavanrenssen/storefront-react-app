import React, { Component } from "react";
import classes from "./CartAttributes.module.css";
import { CartContext } from "../../store/contexts";

class CartAttributes extends Component {
  static contextType = CartContext;

  render() {
    const { product, cartModalStyle } = this.props;
    const { cart } = this.context;

    let cartMap = cart.filter((cartItem) => {
      return cartItem.id === product.id;
    });
    console.log(cartMap);

    return (
      <div>
        {
          <div className={classes.attr}>
            {product.attributes.map((attribute) => {
              return (
                <div key={attribute.id} className={classes.attrblock}>
                  <h4
                    className={`${
                      cartModalStyle
                        ? classes.modalattrheading
                        : classes.attrheading
                    }`}
                  >
                    {attribute.name}:
                  </h4>
                  <div
                    className={
                      cartModalStyle
                        ? attribute.type === "swatch"
                          ? classes.modalswatchbuttons
                          : classes.modalsizebuttons
                        : attribute.type === "swatch"
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
                            cartModalStyle
                              ? attribute.type === "swatch"
                                ? classes.modalswatchbutton
                                : attribute.name !== "Size"
                                ? classes.modalattrbutton
                                : classes.modalsizebutton
                              : attribute.type === "swatch"
                              ? classes.swatchbutton
                              : classes.sizebutton
                          } 
                          ${
                            attribute.type === "text" &&
                            // Object.hasOwn(
                            //   cartMap[0].id,
                            //   attribute.id
                            // ) &&
                            Object.values(
                              cartMap[0].selectedAttributes
                            ).includes(item.id)
                              ? classes.selectedcartattribute
                              : ""
                          }
                          ${
                            attribute.type === "swatch" &&
                            Object.hasOwn(
                              cartMap[0].selectedAttributes,
                              attribute.id
                            ) &&
                            Object.values(
                              cartMap[0].selectedAttributes
                            ).includes(item.id)
                              ? classes.selectedswatchattribute
                              : ""
                          }
                          
                          
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF"
                               ? classes.whiteswatchbutton
                               : ""
                           }
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF" &&
                             Object.hasOwn(
                               cartMap[0].selectedAttributes,
                               attribute.id
                             ) &&
                             Object.values(
                               cartMap[0].selectedAttributes
                             ).includes(item.id) &&
                             cartModalStyle
                               ? classes.modalactivewhiteswatchbutton
                               : ""
                           }
                           ${
                             attribute.type === "swatch" &&
                             item.value === "#FFFFFF" &&
                             Object.hasOwn(
                               cartMap[0].selectedAttributes,
                               attribute.id
                             ) &&
                             Object.values(
                               cartMap[0].selectedAttributes
                             ).includes(item.id) &&
                             !cartModalStyle
                               ? classes.activewhiteswatchbutton
                               : ""
                           }
                          
                          `}
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
      </div>
    );
  }
}

export default CartAttributes;
