import { React, useEffect, useState } from "react";
// hook redux pour la gestion des données
import { useDispatch, useSelector } from "react-redux";
import { ajouterCategorie, modifierCategorie, supprimerCategorie, setErreurCategorie } from "../redux/reducers/categoriesReducer";
import '../../src/index.css';

function CategoriesListe() {

    const dispatch = useDispatch();
    // useSelector pour récupérer les catégories depuis l'état global de Redux (pas useState)
    const categories = useSelector((state) => state.categories.categories);
    // état pour les attributs
    const [nom, setNom] = useState("");
    // État pour la catégorie en cours de modification
    const [categorieEnCours, setCategorieEnCours] = useState(null);

    // chargement de la liste dès le lancement de l'app
    useEffect(() => {
    // récupération des données des catégories
    fetch('http://127.0.0.1:8000/api/categories')
        .then((res) => res.json())
        .then((data) => {
            // Envoi de l'action Redux pour stocker les catégories dans le store
            data.forEach(categorie => dispatch(ajouterCategorie(categorie)));
        })
        .catch((err) => console.error('Erreur dans la récupération des données', err));
    }, [dispatch]);

    // Fonction d'ajout d'une nouvelle catégorie
    const ajoutCategorie = (e) => {
        e.preventDefault();
    
        const nouvelleCategorie = { nom: nom };

        // Envoie de la requête API pour ajouter la catégorie
        fetch("http://127.0.0.1:8000/api/categories", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nouvelleCategorie),
        })
        .then((res) => res.json())
        .then((data) => {
            // Action avec Redux
            dispatch(ajouterCategorie(data));
            setNom("");
        })
        .catch((err) => {
            console.error(err);
            dispatch(setErreurCategorie("Erreur lors de l'ajout de la catégorie"));
        });
    };

    // Fonction de modification d'une catégorie
    const handleModifierCategorie = (e) => {
        e.preventDefault();

        const changeCategorie = { nom: categorieEnCours.nom };


        fetch(`http://127.0.0.1:8000/api/categories/${categorieEnCours.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changeCategorie),
        })
        .then((res) => res.json())
        .then((data) => {
            // Envoi de l'action Redux
            dispatch(modifierCategorie(data));
            setCategorieEnCours(null);
        })
        .catch((err) => {
            console.error(err);
            dispatch(setErreurCategorie("Erreur lors de la modification de la catégorie"));
          });
    };

    // Fonction pour supprimer une catégorie
    const handleSupprimerCategorie = (id) => {
        // Appel de la méthode delete pour la suppression
        fetch(`http://127.0.0.1:8000/api/categories/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    // Appel action redux pour supprimer la catégorie
                    dispatch(supprimerCategorie(id));
                } else {
                    console.error("Erreur de suppression de la catégorie");
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setErreurCategorie("Erreur lors de la supression de la catégorie"));
              });
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
        <h1 className="text-3xl font-bold text-primary mb-4">Ajouter une catégorie</h1>

        <form onSubmit={ajoutCategorie} className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="mb-4">
                <label htmlFor="categorie" className="block text-gray-700 text-sm font-medium">Nom de la catégorie</label>
                <input
                    type="text"
                    id="categorie"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary">
                Ajouter la catégorie
            </button>
        </form>

        <h2 className="text-2xl font-bold text-primary mb-4">Liste des catégories</h2>
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead className="bg-primary text-white">
                <tr>
                    <th className="px-4 py-2">Nom</th>
                    <th className="px-4 py-2">Modifier/Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((categorie) => (
                    <tr key={categorie.id} className="border-t border-gray-300">
                        <td className="px-4 py-2">{categorie.nom}</td>
                        <td className="px-4 py-2">
                        <button
                            onClick={() => setCategorieEnCours(categorie)}
                            className="bg-secondary text-white px-4 py-2 rounded-md mr-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary">
                            Modifier
                        </button>
                        <button
                            onClick={() => handleSupprimerCategorie(categorie.id)}
                            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-accent">
                            Supprimer
                        </button>
                        </td>
                    </tr>
    ))}
    </tbody>
</table>


        <ul className="space-y-4">
            {categories.map((categorie) => (
                <li key={categorie.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                    <span className="text-lg font-medium text-gray-700">{categorie.nom}</span>
                    <div className="space-x-2">
                        <button
                            onClick={() => setCategorieEnCours(categorie)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={() => handleSupprimerCategorie(categorie.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Supprimer
                        </button>
                    </div>
                </li>
            ))}
        </ul>

        {categorieEnCours && (
            <form onSubmit={handleModifierCategorie} className="bg-white p-4 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Modifier la catégorie</h2>
                <input
                    type="text"
                    value={categorieEnCours.nom}
                    onChange={(e) => setCategorieEnCours({ ...categorieEnCours, nom: e.target.value })}
                    required
                    className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-4 flex justify-between">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Modifier
                    </button>
                    <button
                        type="button"
                        onClick={() => setCategorieEnCours(null)}
                        className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Annuler
                    </button>
                </div>
            </form>

            
        )}
    </div>
    );
}

export default CategoriesListe;
