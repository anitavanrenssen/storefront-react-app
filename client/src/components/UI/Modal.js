import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

class Backdrop extends Component {
  render() {
    return (
      <div
        className={
          this.props.currencySwitcher
            ? classes["dropdown-list-backdrop"]
            : classes.backdrop
        }
        onClick={this.props.onClose}
      />
    );
  }
}

class ModalOverlay extends Component {
  render() {
    return (
      <div
        className={
          this.props.currencySwitcher ? classes["dropdown-list"] : classes.modal
        }
      >
        <div className={classes.content}>{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById("overlays");

class Modal extends Component {
  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop
            currencySwitcher={this.props.currencySwitcher}
            onClose={this.props.onClose}
          />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay currencySwitcher={this.props.currencySwitcher}>
            {this.props.children}
          </ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
}

export default Modal;
