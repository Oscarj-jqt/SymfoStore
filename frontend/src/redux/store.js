// Fichier pour stocker les états globaux
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "./reducers/productsReducer";
import categoriesReducer from './reducers/categoriesReducer'

const store = configureStore({
  reducer: {

    products: productsReducer,
    categories: categoriesReducer
  },
});

export default store;
