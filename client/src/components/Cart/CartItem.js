import React, { Component } from "react";
import classes from "./CartItem.module.css";
// import ProductAttributes from "../Products/ProductDescription/ProductAttributes";
import CartGallery from "./CartGallery";
import { CurrencyContext } from "../../store/contexts";
import CartAttributes from "./CartAttributes";
import PlusMinusButton from "../UI/PlusMinusButton";

class CartItem extends Component {
  static contextType = CurrencyContext;

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

    const filteredCurrency = product.prices.filter((currency) => {
      return currency.currency.label === this.context.currency;
    });

    return (
      <div
        className={`${
          this.props.cartModalStyle ? classes.modalcartitem : classes.cartitem
        }`}
      >
        <div className={classes.itemdetailsamount}>
          <div
            className={`${
              this.props.cartModalStyle && classes.modalitemheading
            }`}
          >
            <h4
              className={`${
                this.props.cartModalStyle ? classes.modalbrand : classes.brand
              }`}
            >
              {product.brand}
            </h4>
            <h4
              className={`${
                this.props.cartModalStyle ? classes.modalname : classes.name
              }`}
            >
              {product.itemName}
            </h4>
            <div
              className={`${
                this.props.cartModalStyle ? classes.modalprice : classes.price
              }`}
            >
              {filteredCurrency[0].currency.symbol}
              {filteredCurrency[0].amount}
            </div>
            {!product.attributes ||
              (product.attributes.length > 0 && (
                // <ProductAttributes
                //   product={product}
                //   onAddToCart={this.addToCartHandler.bind(this)}
                //   cartModalStyle={this.props.cartModalStyle}
                //   cartStyle={this.props.cartStyle}
                // />
                <CartAttributes
                  product={product}
                  cartModalStyle={this.props.cartModalStyle}
                />
              ))}
          </div>
        </div>
        <div
          className={`${
            this.props.cartModalStyle
              ? classes.modalamountgallery
              : classes.amountgallery
          }`}
        >
          <div
            className={`${
              this.props.cartModalStyle
                ? classes.modalamountcontainer
                : classes.amountcontainer
            }`}
          >
            <button className={classes.plusbutton} onClick={this.props.onAdd}>
              <div
                className={
                  this.props.cartModalStyle ? classes.modalplus : classes.plus
                }
              >
                <PlusMinusButton cartModalStyle={this.props.cartModalStyle} />
              </div>

              <PlusMinusButton cartModalStyle={this.props.cartModalStyle} />
            </button>
            <span>{product.qty}</span>
            <button
              className={classes.minusbutton}
              onClick={this.props.onRemove}
            >
              <PlusMinusButton cartModalStyle={this.props.cartModalStyle} />
            </button>
          </div>
          <CartGallery
            gallery={product.gallery}
            name={product.itemName}
            cartModalStyle={this.props.cartModalStyle}
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
