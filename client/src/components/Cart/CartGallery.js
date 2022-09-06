import React, { Component } from "react";
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
      <div>
        <div
          className={`${
            cartModalStyle
              ? classes.modalcarouselcontainer
              : classes.carouselcontainer
          }`}
        >
          {!cartModalStyle && gallery.length > 1 && (
            <div>
              <button
                className={classes.arrowleft}
                onClick={this.goToPreviousHandler.bind(this)}
              >
                <svg
                  width="5.63"
                  height="11.24"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                className={classes.arrowright}
                onClick={this.goToNextHandler.bind(this)}
              >
                <svg
                  width="5.63"
                  height="11.24"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
