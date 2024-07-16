import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  try {
    const cartData = window.localStorage.getItem("cart");
    if (cartData === null) {
      return {
        items: [],
      };
    }

    return JSON.parse(cartData);
  } catch (error) {
    console.log("Error while loading cart items", error);
    return {
      items: [],
    };
  }
};

const saveStateIntoLocalStorage = (state) => {
  try {
    const cartData = JSON.stringify(state);
    window.localStorage.setItem("cart", cartData);
  } catch (error) {
    console.log("Error while saving items cart to local storage", error);
  }
};

const initialState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      saveStateIntoLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.productId !== itemId);
      saveStateIntoLocalStorage(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveStateIntoLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      saveStateIntoLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
