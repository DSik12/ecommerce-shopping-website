import React from "react";

export const initialState = 0;
export const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      if (state > 0)
        return state - 1
      else
        return 0
    default:
      return state
  }
}

export const CartQuantityContext = React.createContext()