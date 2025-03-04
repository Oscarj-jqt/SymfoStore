import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  categories: [],
  error: null,
};

// Create the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Action to add a category
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      state.error = null;
    },
    // Action to delete a category
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
      state.error = null;
    },
    // Action to update a category
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
        state.error = null;
      }
    },
    setCategoryError: (state, action) => {
      // Action to set an error message
      state.error = action.payload;
    },
    resetCategoryError: (state) => {
      // Action to reset the error state
      state.error = null;
    }
  },
});

// Export actions
export const { addCategory, deleteCategory, updateCategory, setCategoryError, resetCategoryError } = categoriesSlice.actions;

// Export reducer
export default categoriesSlice.reducer;
