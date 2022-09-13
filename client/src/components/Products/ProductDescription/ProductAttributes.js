import React, { Component } from "react";
import classes from "./ProductAttributes.module.css";
import { CartContext } from "../../../store/contexts";

class ProductAttributes extends Component {
  static contextType = CartContext;

  constructor() {
    super();
    this.state = {
      selectedAttributes: {},
      cartAttributes: [],
    };
  }

  setSelectedItem(selectedAttributes) {
    // console.log(selectedAttributes);
    const selectedItem = this.props.product.attributes.find((attribute) => {
      return attribute.items.every((item) => {
        // console.log(item);
        return selectedAttributes[item.id] === item.displayValue;
      });
    });

    this.setState({
      selectedItem: selectedItem,
    });

    // const selectedOption = this.state.selectedOption;

    // for (const [key, value] of Object.entries(selectedAttributes)) {
    //   this.setState((prevState) => ({
    //     selectedOption: [...prevState.selectedOption, `${key}-${value}`],
    //   }));
    // }

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

    let cartAttr = this.context.cart.map((item) => {
      return item.selectedAttributes;
    });

    this.setState({ cartAttributes: cartAttr });
  }

  render() {
    const { product, cartModalStyle, cartStyle, inStock } = this.props;
    // const { cart } = this.context;

    // console.log(this.state.selectedAttributes);

    // let res = this.state.cartAttributes.every((attr) => {
    //   return (
    //     Object.hasOwn(attr, product.attributes[0].id) &&
    //     Object.values(attr).includes(product.attributes[0].items[0].id)
    //   );
    // });

    // console.log(res);

    // cart.map((item) => {
    //   return Object.entries(item).map((attr) => {
    //     return attr[0] === "selectedAttributes"
    //       ? Object.entries(attr[1]).map((selattr) => {
    //           return console.log(
    //             selattr.includes("41") && selattr.includes("Size")
    //           );
    //         })
    //       : item;
    //   });
    // });

    // console.log(cart[0].selectedAttributes);

    // let res = Object.hasOwn(cart[1].selectedAttributes, "Size");
    // console.log(res);

    // let ress = Object.values(cart[1].selectedAttributes).includes("42");
    // console.log(ress);

    // cart.map((cartItem) => {
    //   return Object.hasOwn(cartItem.selectedAttributes);
    // }) &&

    // let result = cart.every((cartItem) => {
    //   console.log(cartItem.selectedAttributes);
    //   return cartItem.selectedAttributes ? cartItem.selectedAttributes : {};
    // });

    // let res = Object.hasOwn(
    //   this.state.selectedAttributes,
    //   product.attributes[0].id
    // );

    // console.log(product.attributes[0].id);
    // console.log(result);
    // console.log(res);

    // console.log(
    //   Object.entries(this.state.selectedAttributes).map((attr) => {
    //     console.log(attr);
    //     return attr.includes("Touch ID in keyboard", "No");
    //   })
    // );

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
                          disabled={!cartStyle && !cartModalStyle && !inStock}
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
                            !cartModalStyle &&
                            !cartStyle &&
                            attribute.type === "swatch" &&
                            Object.hasOwn(
                              this.state.selectedAttributes,
                              attribute.id
                            ) &&
                            Object.values(
                              this.state.selectedAttributes
                            ).includes(item.id)
                              ? classes.activeswatch
                              : ""
                          } 
                          ${
                            !cartModalStyle &&
                            !cartStyle &&
                            attribute.type === "text" &&
                            Object.hasOwn(
                              this.state.selectedAttributes,
                              attribute.id
                            ) &&
                            Object.values(
                              this.state.selectedAttributes
                            ).includes(item.id)
                              ? classes.activetext
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
                              this.state.selectedAttributes,
                              attribute.id
                            ) &&
                            Object.values(
                              this.state.selectedAttributes
                            ).includes(item.id)
                               ? classes.activewhiteswatchbutton
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
