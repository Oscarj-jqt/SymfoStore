import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouterProduit, modifierProduit, supprimerProduit, setErreurProduit } from "../redux/reducers/produitsReducer";
import '../../src/index.css';
// Composant qui gère l'affichage et les opération CRUD des produits
function ProduitsListe() {

    const dispatch = useDispatch();
    // Récupération des produits depuis Redux
    const produits = useSelector((state) => state.produits.produits);

    // initialisation des attributs
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    // float et ca commence à 0
    const [prix, setPrix] = useState(0);
    const [categorieId, setCategorieId] = useState('');
    // état pour la modification (PUT)
    const [produitEnCours, setProduitEnCours] = useState(null);


    // Au chargement de la page on va charger les produits (GET)
    useEffect(() => {
        // Fetch produits
        fetch("http://127.0.0.1:8000/api/produits")
          .then((res) => res.json())
          .then((data) => {
            data.forEach((produit) => {
              dispatch(ajouterProduit(produit));
            });
          })
          .catch((err) => console.error("Erreur dans la récupération des données", err));
      }, [dispatch]);

    // Fonction d'ajout des produits
    const handleAjouterProduit = (event) => {
        // fonctionnalité js 
        event.preventDefault();

        const nouveauProduit = { nom, description, prix, categorie_relation_id: categorieId };

        // Envoie de la requête API pour ajouter avec Redux
        fetch('http://127.0.0.1:8000/api/produits',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouveauProduit),
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch(ajouterProduit(data));
          setNom("");
          setDescription("");
          setPrix(0);
          setCategorieId("");
        })
        .catch((err) => {
            console.error(err);
            dispatch(setErreurProduit("Erreur lors de l'ajout du produit"));
          });
    };

    // Fonction de modification de produit

    const handleModifierProduit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:8000/api/produits/${produitEnCours.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produitEnCours),
          })
            .then((res) => res.json())
            .then((data) => {
              dispatch(modifierProduit(data));
              setProduitEnCours(null);
          })
          .catch((err) => {
            console.error(err);
            dispatch(setErreurProduit("Erreur lors de la modification du produit"));
          });
    }


    // Fonction de suppression d'un produit (DELETE)
    const handleSupprimerProduit = (id) => {
        fetch(`http://127.0.0.1:8000/api/produits/${id}`, {
            method: 'DELETE',
        })
        .then((res) => {
          if (res.ok) {
            dispatch(supprimerProduit(id));
          } else {
            throw new Error("Erreur lors de la suppression.");
          }
        })
        .catch((err) => {
            console.error(err);
            dispatch(setErreurProduit("Erreur lors de la supression du produit"));
          });
    };
    
        return (
          <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <h1 className="text-3xl font-bold text-primary mb-4">Ajouter un produit</h1>

            <form onSubmit={handleAjouterProduit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prix</label>
                    <input
                        type="number"
                        value={prix}
                        onChange={(e) => {
                            const valeur = parseFloat(e.target.value);
                            if (valeur >= 0) {
                                setPrix(valeur);
                            }
                        }}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary">
                    Ajouter le produit
                </button>
            </form>

            <h2 className="text-2xl font-bold text-primary mb-4">Liste des produits</h2>
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="px-4 py-2">Nom</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Prix</th>
                        <th className="px-4 py-2">Modifier/Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit.id} className="border-t border-gray-300">
                            <td className="px-4 py-2">{produit.nom}</td>
                            <td className="px-4 py-2">{produit.description}</td>
                            <td className="px-4 py-2">{produit.prix}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => setProduitEnCours(produit)}
                                    className="bg-secondary text-white px-4 py-2 rounded-md mr-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleSupprimerProduit(produit.id)}
                                    className="bg-accent text-white px-4 py-2 rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {produitEnCours && (
                <form onSubmit={handleModifierProduit} className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Modifier le produit</h2>
                    <input
                        type="text"
                        value={produitEnCours.nom}
                        onChange={(e) => setProduitEnCours({ ...produitEnCours, nom: e.target.value })}
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <input
                        type="text"
                        value={produitEnCours.description}
                        onChange={(e) => setProduitEnCours({ ...produitEnCours, description: e.target.value })}
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <input
                        type="number"
                        value={produitEnCours.prix}
                        onChange={(e) => setProduitEnCours({ ...produitEnCours, prix: parseFloat(e.target.value) })}
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={() => setProduitEnCours(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2"
                    >
                        Annuler
                    </button>
                </form>
            )}
          </div>
        );
}

export default ProduitsListe;