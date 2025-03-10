import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct, updateProduct, setProductError } from "../redux/reducers/productsReducer";
import { jwtDecode } from "jwt-decode";


const ProductsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const error = useSelector((state) => state.products.error);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newProductName, setNewProductName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(setProductError("Token manquant. Veuillez vous reconnecter."));
            return;
        }

        // Décoder le token pour vérifier le rôle de l'utilisateur
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.roles && decodedToken.roles.includes("ROLE_ADMIN"));

        // Charger les produits depuis l'API
        fetch("http://127.0.0.1:8000/api/product", {
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                data.forEach((product) => dispatch(addProduct(product)));
            })
            .catch((err) => dispatch(setProductError("Erreur lors du chargement des produits.")));
    }, [dispatch]);

    const handleAddProduct = () => {
        if (!newProductName.trim()) return;

        const token = localStorage.getItem("token");
        fetch("http://127.0.0.1:8000/api/admin/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newProductName }),
        })
            .then((res) => res.json())
            .then((newProduct) => dispatch(addProduct(newProduct)))
            .catch(() => dispatch(setProductError("Erreur lors de l'ajout du produit.")));

        setNewProductName("");
    };

    const handleDeleteProduct = (id) => {
        const token = localStorage.getItem("token");
        fetch(`http://127.0.0.1:8000/api/admin/product/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then((res) => {
                if (res.ok) dispatch(deleteProduct(id));
                else throw new Error();
            })
            .catch(() => dispatch(setProductError("Erreur lors de la suppression.")));
    };

    if (error) return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;

    return (
        <div>
            <h2>Liste des Produits</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} {isAdmin && <button onClick={() => handleDeleteProduct(product.id)}>🗑️</button>}
                    </li>
                ))}
            </ul>

            {isAdmin && (
                <div>
                    <input
                        type="text"
                        placeholder="Nouveau produit"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                    />
                    <button onClick={handleAddProduct}>Ajouter un produit</button>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
