// Fichier pour stocker les états globaux
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "./reducers/productsReducer";
import categoriesReducer from './reducers/categoriesReducer'

const store = configureStore({
  reducer: {
    // On associe le reducer à produits, l'état global des produits
    produits: produitsReducer,
    // De même avec categories
    // Avec cet ajout final on voit nos données s'afficher
    categories: categoriesReducer
  },
});

export default store;
