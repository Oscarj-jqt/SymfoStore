import { createSlice } from '@reduxjs/toolkit';

// État initial de notre slice
const initialState = {
  categories: [],
  // On ajoute un état d'erreur pour indiquer à l'utilisateur
  erreur: null
};

// Création du slice
const categoriesSlice = createSlice({
    // Le nom du slice
  name: 'categories', 
  initialState,
  reducers: {
    // Action pour ajouter un categorie
    ajouterCategorie: (state, action) => {
      state.categories.push(action.payload);
      // Réinitialisation de l'erreur lors d'une action réussie
      state.erreur = null; 

    },
    // Action pour supprimer un categorie
    supprimerCategorie: (state, action) => {
      state.categories = state.categories.filter(categorie => categorie.id !== action.payload);
      state.erreur = null;
    },
    // Action pour modifier un categorie
    modifierCategorie: (state, action) => {
      const index = state.categories.findIndex(categorie => categorie.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
        state.erreur = null;
      }
    },
    setErreurCategorie: (state, action) => {
      // L'action pour que l'on définisse l'erreur
      state.erreur = action.payload;
    },
    resetErreurCategorie: (state) => {
      // L'action pour réinitialiser l'erreur
      state.erreur = null;
    }
  },
});

// Export des actions générées par createSlice
export const { ajouterCategorie, supprimerCategorie, modifierCategorie, setErreurCategorie, resetErreurCategorie } = categoriesSlice.actions;

// Export du reducer
export default categoriesSlice.reducer;
