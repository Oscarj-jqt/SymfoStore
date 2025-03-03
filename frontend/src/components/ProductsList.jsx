import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct, setProductError } from "../redux/reducers/productsReducer";
import '../../src/index.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/admin/product", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }),
                    fetch("http://127.0.0.1:8000/api/admin/category", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }),
                ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error("Erreur lors de la récupération des données.");
                }

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProducts(productsData);
                setCategories(categoriesData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement des produits et catégories...</p>;
    }


    return (
        <div>
            <h2>Liste des Produits</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>

            <h2>Liste des Catégories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;
