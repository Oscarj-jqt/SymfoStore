import { createSlice } from '@reduxjs/toolkit';

// État initial de notre slice
const initialState = {
  produits: [],
  erreur: null,
};

// Création du slice
const produitsSlice = createSlice({
    // Le nom du slice
  name: 'produits', 
  initialState,
  reducers: {
    // Action pour ajouter un produit
    ajouterProduit: (state, action) => {
      state.produits.push(action.payload);
      state.erreur = null;
    },
    // Action pour supprimer un produit
    supprimerProduit: (state, action) => {
      state.produits = state.produits.filter(produit => produit.id !== action.payload);
      state.erreur = null;
    },
    // Action pour modifier un produit
    modifierProduit: (state, action) => {
      const index = state.produits.findIndex(produit => produit.id === action.payload.id);
      if (index !== -1) {
        state.produits[index] = action.payload;
        state.erreur = null;
      }
    },
    setErreurProduit: (state, action) => {
      state.erreur = action.payload;
    },
    resetErreurProduit: (state) => {
      state.erreur = null;
    }
  },
});

// Export des actions générées par createSlice
export const { ajouterProduit, supprimerProduit, modifierProduit, setErreurProduit, resetErreurProduit } = produitsSlice.actions;

// Export du reducer
export default produitsSlice.reducer;
