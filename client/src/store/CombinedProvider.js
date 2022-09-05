import React from "react";
import { CartContext, CurrencyContext, CombinedContext } from "./contexts";

const CombinedProvider = (props) => {
  return (
    <CartContext.Consumer>
      {(cartcontext) => (
        <CurrencyContext.Consumer>
          {(currencycontext) => (
            <CombinedContext.Provider value={{ cartcontext, currencycontext }}>
              {props.children}
            </CombinedContext.Provider>
          )}
        </CurrencyContext.Consumer>
      )}
    </CartContext.Consumer>
  );
};
export default CombinedProvider;
