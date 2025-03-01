import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  products: [],
  error: null,
};

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action to add a product
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.error = null;
    },
    // Action to delete a product
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.error = null;
    },
    // Action to update a product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.error = null;
      }
    },
    setProductError: (state, action) => {
      state.error = action.payload;
    },
    resetProductError: (state) => {
      state.error = null;
    }
  },
});

// Export actions
export const { addProduct, deleteProduct, updateProduct, setProductError, resetProductError } = productsSlice.actions;

// Export reducer
export default productsSlice.reducer;
