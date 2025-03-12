import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchProductsAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
} from "../redux/reducers/productsReducer";

const ProductsList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const token = localStorage.getItem("token"); // Vérifie si l'utilisateur est admin

    //  États pour la gestion de l'ajout et de la modification
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", category_id: "" });
    const [editProduct, setEditProduct] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    //  Vérifier que le produit est valide
    const isValidProduct = (product) => {
        if (!product.name.trim()) {
            setMessage("Le nom du produit est requis.");
            return false;
        }
        if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
            setMessage("Le prix doit être un nombre positif.");
            return false;
        }
        return true;
    };

    //  Ajouter un produit
    const handleAddProduct = () => {
        if (!isValidProduct(newProduct)) return;

        dispatch(addProductAsync(newProduct));
        setNewProduct({ name: "", description: "", price: "", category_id: "" });
        setMessage(""); // Réinitialiser le message
    };

    //  Modifier un produit
    const handleUpdateProduct = (id) => {
        if (!isValidProduct(editProduct)) return;

        dispatch(updateProductAsync({ id, updatedProduct: editProduct }));
        setEditProduct(null); // Quitter le mode édition
        setMessage(""); // Réinitialiser le message
    };

    return (
        <div>
            <h2>Liste des Produits</h2>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}

            <table border="1">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Catégorie</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price} €</td>
                        <td>{product.category?.name || "Non défini"}</td>
                        <td>
                            <button onClick={() => setEditProduct(product)}>Modifier</button>
                            <button onClick={() => dispatch(deleteProductAsync(product.id))}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Ajouter un Produit</h3>
            <input type="text" placeholder="Nom" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="number" placeholder="Prix" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <button onClick={handleAddProduct}>Ajouter</button>
        </div>
    );
};

export default ProductsList;
