import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        return state.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    },
    deleteFromCart: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity === 1) {
        return state.filter((product) => product.id !== id);
      } else {
        // Returning a new state with quantity updated
        return state.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
      }
    },
    clear: () => [],
  },
});

export const { addToCart, deleteFromCart, clear } = cartSlice.actions;
export default cartSlice.reducer;
