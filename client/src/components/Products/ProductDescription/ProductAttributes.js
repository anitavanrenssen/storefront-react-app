import React, { Component } from "react";
import classes from "./ProductAttributes.module.css";
import { CartContext } from "../../../store/contexts";

class ProductAttributes extends Component {
  static contextType = CartContext;

  constructor() {
    super();
    this.state = {
      selectedAttributes: {},
    };
  }

  setSelectedItem(selectedAttributes) {
    console.log(selectedAttributes);
    const selectedItem = this.props.product.attributes.find((attribute) => {
      return attribute.items.every((item) => {
        console.log(item);
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
    const { product, cartModalStyle } = this.props;

    // const attr = this.state.selectedAttributes;

    // console.log(
    //   Object.values(this.state.selectedAttributes).every((v) => {
    //     return v === product.attributes;
    //   })
    // );

    // const obj = this.context.cart.map((item) => {
    //   return item.selectedAttributes;
    // });

    // return item.selectedAttributes.every((attr) => {
    //   return Object.keys(attr).forEach((e) => {
    //     console.log(`key=${e} value=${attr[e]}`);
    //     // let values = item.selectedAttributes[key];
    //     // return values;
    //   });
    // });

    // const obj = this.props.product.attributes.find((attribute) => {
    //   return attribute.items.every((item) => {
    //     return selectedAttributes[attribute.name] === item.value;
    //   });

    // console.log(obj);

    return (
      <div>
        {
          <div className={classes.attr}>
            {product.attributes.map((attribute) => {
              return (
                <div key={attribute.id} className={classes.attrblock}>
                  <h4
                    className={`${
                      this.props.cartModalStyle
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
                          disabled={
                            !this.props.cartStyle &&
                            !this.props.cartModalStyle &&
                            !this.props.inStock
                          }
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
                            Object.values(this.state.selectedAttributes).every(
                              (v) => {
                                return v === item.id;
                              }
                            ) &&
                            attribute.type === "swatch" &&
                            classes.activeswatch
                          } ${
                            attribute.type === "text" &&
                            Object.values(this.state.selectedAttributes).every(
                              (v) => {
                                // console.log(this.state.selectedAttributes);
                                // console.log(v, item.id);
                                return v === item.id;
                              }
                            ) &&
                            classes.activetext
                          }
                          } ${
                            attribute.type === "swatch" &&
                            item.value === "#FFFFFF"
                              ? classes.whiteswatchbutton
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
      </div>
    );
  }
}

export default ProductAttributes;
