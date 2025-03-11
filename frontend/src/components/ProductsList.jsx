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

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    //  Ajouter un produit
    const handleAddProduct = () => {
        dispatch(addProductAsync(newProduct));
        setNewProduct({ name: "", description: "", price: "", category_id: "" }); // Réinitialisation du formulaire
    };

    //  Modifier un produit
    const handleUpdateProduct = (id) => {
        dispatch(updateProductAsync({ id, updatedProduct: editProduct }));
        setEditProduct(null); // Quitter le mode édition
    };

    //  Supprimer un produit
    const handleDeleteProduct = (id) => {
        dispatch(deleteProductAsync(id));
    };

    return (
        <div>
            <h2>Liste des Produits</h2>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                            <button onClick={() => handleUpdateProduct}>Modifier</button>
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
            {/*<select value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>*/}
            {/*    /!*<option value="">Sélectionner une catégorie</option>*!/*/}
            {/*    /!*{categories.map((cat) => (*!/*/}
            {/*    /!*    <option key={cat.id} value={cat.id}>{cat.name}</option>*!/*/}
            {/*    /!*))}*!/*/}
            {/*</select>*/}
            <button onClick={handleAddProduct}>Ajouter</button>
        </div>
    );

};

export default ProductsList;
