import React, { Component } from "react";
import { ReactComponent as GalleryArrow } from "../../assets/gallery-arrow.svg";
import classes from "./CartGallery.module.css";

class CartGallery extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }

  goToPreviousHandler() {
    const isFirstSlide = this.state.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.props.gallery.length - 1
      : this.state.currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  }

  goToNextHandler() {
    const isLastSlide =
      this.state.currentIndex === this.props.gallery.length - 1;
    const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  }

  render() {
    const { gallery, name, cartModalStyle } = this.props;
    return (
      <div className={cartModalStyle && classes["modal-gallery-container"]}>
        <div
          className={`${
            cartModalStyle
              ? classes["modal-carousel-container"]
              : classes["carousel-container"]
          }`}
        >
          {!cartModalStyle && gallery.length > 1 && (
            <div>
              <button
                className={classes["arrow-left"]}
                onClick={this.goToPreviousHandler.bind(this)}
              >
                <GalleryArrow />
              </button>
              <button
                className={classes["arrow-right"]}
                onClick={this.goToNextHandler.bind(this)}
              >
                <GalleryArrow />
              </button>
            </div>
          )}
          <img src={gallery[this.state.currentIndex]} alt={name} />
        </div>
      </div>
    );
  }
}

export default CartGallery;
