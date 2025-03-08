import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode"; // Import de la librairie jwt-decode

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Token manquant. Veuillez vous reconnecter.");
                setLoading(false);
                return;
            }

            // Décoder le token
            const decodedToken = jwt_decode(token);
            console.log(decodedToken); // Vérifie la structure du token

            // Vérifier si l'utilisateur a le rôle 'ROLE_ADMIN'
            const isAdmin = decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');

            try {
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
                    setTimeout(() => navigate("/login"), 2000); // Redirection après 2 secondes
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
    }, [navigate]);

    if (loading) return <p>Chargement des produits...</p>;
    if (error) return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;

    return (
        <div>
            <h2>Liste des Produits</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            {isAdmin && (
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
