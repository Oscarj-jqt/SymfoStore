import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct, setProductError } from "../redux/reducers/productsReducer";
import '../../src/index.css';

function ProductsList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((product) => {
                    dispatch(addProduct(product));
                });
            })
            .catch((err) => console.error("Error fetching products", err));
    }, [dispatch]);

    const handleAddProduct = (event) => {
        event.preventDefault();

        const newProduct = { name, description, price, category_relation_id: categoryId };

        fetch('http://127.0.0.1:8000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(addProduct(data));
                setName("");
                setDescription("");
                setPrice(0);
                setCategoryId("");
            })
            .catch((err) => {
                console.error(err);
                dispatch(setProductError("Error adding product"));
            });
    };

    const handleUpdateProduct = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:8000/api/products/${currentProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(updateProduct(data));
                setCurrentProduct(null);
            })
            .catch((err) => {
                console.error(err);
                dispatch(setProductError("Error updating product"));
            });
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://127.0.0.1:8000/api/products/${id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    dispatch(deleteProduct(id));
                } else {
                    throw new Error("Error deleting product");
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setProductError("Error deleting product"));
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <h1 className="text-3xl font-bold text-primary mb-4">Add Product</h1>

            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0) {
                                setPrice(value);
                            }
                        }}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary">
                    Add Product
                </button>
            </form>

            <h2 className="text-2xl font-bold text-primary mb-4">Product List</h2>
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                <thead className="bg-primary text-white">
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-t border-gray-300">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.description}</td>
                        <td className="px-4 py-2">{product.price}</td>
                        <td className="px-4 py-2">
                            <button onClick={() => handleUpdateProduct(product.id)} className="bg-secondary text-white px-4 py-2 rounded-md mr-2 hover:bg-accent">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="bg-accent text-white px-4 py-2 rounded-md hover:bg-highlight">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsList;
