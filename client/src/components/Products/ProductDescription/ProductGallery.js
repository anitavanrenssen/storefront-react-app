import React, { Component } from "react";

import classes from "./ProductGallery.module.css";

class ProductGallery extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedImage: props.gallery[0],
    };
  }

  selectImgHandler(e) {
    this.setState({ selectedImage: e.target.src });
  }

  render() {
    return (
      <div className={classes.container}>
        <section className={classes["image-container"]}>
          {this.props.gallery.map((item, index) => {
            return (
              <div key={index} className={classes["image-gallery"]}>
                <img
                  src={item}
                  key={index}
                  alt={this.props.name}
                  onClick={this.selectImgHandler.bind(this)}
                />
              </div>
            );
          })}
        </section>
        <section className={classes["selected-image-container"]}>
          <img src={this.state.selectedImage} alt="Selected" />
          {!this.props.inStock && (
            <div className={classes["out-of-stock"]}>Out of Stock</div>
          )}
        </section>
      </div>
    );
  }
}

export default ProductGallery;
