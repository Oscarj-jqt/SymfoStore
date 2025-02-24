const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

// Activer CORS pour autoriser les requêtes de tous les domaines
app.use(cors());

const db = {
  "produits": [
      {
        "id": 1,
        "nom": "Produit A",
        "description": "Description du Produit A",
        "prix": 10.99,
        "categorie_relation_id": 1
      },
      {
        "id": 2,
        "nom": "Produit B",
        "description": "Description du Produit B",
        "prix": 15.49,
        "categorie_relation_id": 2
      },
      {
        "id": 3,
        "nom": "Produit C",
        "description": "Description du Produit C",
        "prix": 7.99,
        "categorie_relation_id": 1
      }
    ],
    "categories": [
      {
        "id": 1,
        "nom": "Catégorie 1"
      },
      {
        "id": 2,
        "nom": "Catégorie 2"
      }
    ]
};

app.get('/api/produits', (req, res) => {
  res.json(db.produits);
});

app.get('/api/categories', (req, res) => {
  res.json(db.categories);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
