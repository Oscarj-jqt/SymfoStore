import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 URL de base pour l'API
const API_URL = "http://127.0.0.1:8000/api/admin/product";

// 🔹 Ajouter un produit
export const addProductAsync = createAsyncThunk(
    "products/addProduct",
    async (productData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          throw new Error("Échec de l'ajout du produit");
        }

        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

// 🔹 Modifier un produit
export const updateProductAsync = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updatedProduct }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
          throw new Error("Échec de la modification du produit");
        }

        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

// 🔹 Supprimer un produit
export const deleteProductAsync = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Échec de la suppression du produit");
        }

        return id; // Retourne l'ID du produit supprimé
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

// 🔹 Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// 🔹 Création du slice Redux
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // 🔹 Ajouter un produit
        .addCase(addProductAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProductAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        })
        .addCase(addProductAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // 🔹 Modifier un produit
        .addCase(updateProductAsync.fulfilled, (state, action) => {
          const index = state.products.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        })
        // 🔹 Supprimer un produit
        .addCase(deleteProductAsync.fulfilled, (state, action) => {
          state.products = state.products.filter((p) => p.id !== action.payload);
        });
  },
});

// 🔹 Export du reducer
export default productsSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';
// je
// // Initial state
// const initialState = {
//   products: [],
//   error: null,
// };
//
// // Create the slice
// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     // Action to add a product
//     addProduct: (state, action) => {
//       state.products.push(action.payload);
//       state.error = null;
//     },
//     // Action to delete a product
//     deleteProduct: (state, action) => {
//       state.products = state.products.filter(product => product.id !== action.payload);
//       state.error = null;
//     },
//     // Action to update a product
//     updateProduct: (state, action) => {
//       const index = state.products.findIndex(product => product.id === action.payload.id);
//       if (index !== -1) {
//         state.products[index] = action.payload;
//         state.error = null;
//       }
//     },
//     setProductError: (state, action) => {
//       state.error = action.payload;
//     },
//     resetProductError: (state) => {
//       state.error = null;
//     }
//   },
// });
//
// // Export actions
// export const { addProduct, deleteProduct, updateProduct, setProductError, resetProductError } = productsSlice.actions;
//
// // Export reducer
// export default productsSlice.reducer;
