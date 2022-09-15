import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

class Backdrop extends Component {
  render() {
    return (
      <div
        className={
          this.props.currencyswitcher
            ? classes.dropdownlistbackdrop
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
          this.props.currencyswitcher ? classes.dropdownlist : classes.modal
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
            currencyswitcher={this.props.currencyswitcher}
            onClose={this.props.onClose}
          />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay currencyswitcher={this.props.currencyswitcher}>
            {this.props.children}
          </ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
}

export default Modal;
