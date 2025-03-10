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

    // 🔹 États pour la gestion de l'ajout et de la modification
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", category_id: "" });
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    // 🔹 Ajouter un produit
    const handleAddProduct = () => {
        dispatch(addProductAsync(newProduct));
        setNewProduct({ name: "", description: "", price: "", category_id: "" }); // Réinitialisation du formulaire
    };

    // 🔹 Modifier un produit
    const handleUpdateProduct = (id) => {
        dispatch(updateProductAsync({ id, updatedProduct: editProduct }));
        setEditProduct(null); // Quitter le mode édition
    };

    // 🔹 Supprimer un produit
    const handleDeleteProduct = (id) => {
        dispatch(deleteProductAsync(id));
    };

    return (
        <div>
            <h2>Liste des Produits</h2>

            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {editProduct?.id === product.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                />
                                <button onClick={() => handleUpdateProduct(product.id)}>Enregistrer</button>
                                <button onClick={() => setEditProduct(null)}>Annuler</button>
                            </div>
                        ) : (
                            <div>
                                {product.name} - {product.price}€
                                {token && (
                                    <div>
                                        <button onClick={() => setEditProduct(product)}>Modifier</button>
                                        <button onClick={() => handleDeleteProduct(product.id)}>Supprimer</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {token && (
                <div>
                    <h3>Ajouter un produit</h3>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Prix"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="ID Catégorie"
                        value={newProduct.category_id}
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                    />
                    <button onClick={handleAddProduct}>Ajouter</button>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
