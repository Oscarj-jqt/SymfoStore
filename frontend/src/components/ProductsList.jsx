import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Ajout du state isAdmin
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Aucun token trouvé, veuillez vous connecter.");
                return;
            }

            try {
                // Décoder le token
                const decodedToken = jwtDecode(token);
                console.log(decodedToken); // Vérifie la structure du token

                // Vérifier si l'utilisateur a le rôle 'ROLE_ADMIN'
                const isUserAdmin = decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
                setIsAdmin(isUserAdmin); // Met à jour le state

                const response = await fetch("http://127.0.0.1:8000/api/admin/product", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    setError("Session expirée. Veuillez vous reconnecter.");
                    localStorage.removeItem("token");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des produits.");
                }

                const productsData = await response.json();
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur:", error);
                setError("Impossible de charger les produits.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Chargement des produits...</p>;
    if (error) return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;

    return (
        <div>
            <h2>Liste des Produits</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Description</th>
                    <th>Prix (€)</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category?.name || "Non défini"}</td>
                        <td>{product.description}</td>
                        <td>{product.price} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isAdmin && ( // Utilisation du state isAdmin ici
                <div>
                    <button>Ajouter un produit</button>
                    <button>Modifier un produit</button>
                    <button>Supprimer un produit</button>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
