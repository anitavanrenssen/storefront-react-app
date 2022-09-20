import React from "react";

export const CartContext = React.createContext({
  cart: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id) => {},
});

export const CurrencyContext = React.createContext({
  currency: "",
  changeCurrency: () => {},
});

export const CategoryContext = React.createContext({
  category: "",
  changeCategory: () => {},
});


