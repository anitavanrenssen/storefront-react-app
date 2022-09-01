import React, { Component } from "react";
import classes from "./CartItem.module.css";
import ProductAttributes from "../Products/ProductDescription/ProductAttributes";
import CartGallery from "./CartGallery";

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      selectedAttributes: [],
    };
  }

  addToCartHandler(selectedAttributes) {
    this.setState({
      selectedAttributes: selectedAttributes.selectedAttributes,
    });
    // console.log(this.state.selectedAttributes);
  }

  render() {
    const { product } = this.props;
    console.log(this.props.product.selectedAttributes);
    return (
      <div className={classes.cartitem}>
        <div className={classes.itemdetailsamount}>
          <div>
            <h4 className={classes.brand}>{product.brand}</h4>
            <h4 className={classes.name}>{product.itemName}</h4>
            <div className={classes.price}>
              <span>{product.prices[0].currency.symbol}</span>
              <span>{product.prices[0].amount}</span>
            </div>
            {!product.attributes ||
              (product.attributes.length > 0 && (
                <ProductAttributes
                  product={product}
                  onAddToCart={this.addToCartHandler.bind(this)}
                />
              ))}
          </div>
        </div>
        <div className={classes.amountgallery}>
          <div className={classes.amountcontainer}>
            <button onClick={this.props.onAdd}>+</button>
            <span>{product.qty}</span>
            <button onClick={this.props.onRemove}>-</button>
          </div>
          <CartGallery gallery={product.gallery} name={product.itemName} />
        </div>
      </div>
    );
  }
}

export default CartItem;
