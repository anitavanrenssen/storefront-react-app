import React, { Component } from "react";
import classes from "./ProductGallery.module.css";

class ProductGallery extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedImg: props.gallery[0],
    };
  }

  selectImgHandler(e) {
    this.setState({ selectedImg: e.target.src });
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          {this.props.gallery.map((item, index) => {
            return (
              <div key={index}>
                <img
                  src={item}
                  key={index}
                  alt={this.props.name}
                  onClick={this.selectImgHandler.bind(this)}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.selectedImgContainer}>
          <img
            src={this.state.selectedImg}
            alt="Selected"
            className={classes.selected}
          />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
