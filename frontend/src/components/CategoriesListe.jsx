import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, updateCategory, deleteCategory, setCategoryError } from "../redux/reducers/categoriesReducer";
import '../../src/index.css';

function CategoriesList() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [name, setName] = useState("");
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        // Fetch categories from API on component mount
        fetch('http://127.0.0.1:8000/api/categories')
            .then((res) => res.json())
            .then((data) => {
                data.forEach(category => dispatch(addCategory(category)));
            })
            .catch((err) => console.error('Error fetching categories', err));
    }, [dispatch]);

    const addNewCategory = (e) => {
        e.preventDefault();
        const newCategory = { name: name };

        fetch("http://127.0.0.1:8000/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(addCategory(data)); // Dispatch the newly created category
                setName(""); // Reset input field
            })
            .catch((err) => {
                console.error(err);
                dispatch(setCategoryError("Error adding category"));
            });
    };

    const modifyCategory = (e) => {
        e.preventDefault();
        const updatedCategory = { name: currentCategory.name };

        fetch(`http://127.0.0.1:8000/api/categories/${currentCategory.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCategory),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(updateCategory(data)); // Dispatch the updated category
                setCurrentCategory(null); // Reset the editing state
            })
            .catch((err) => {
                console.error(err);
                dispatch(setCategoryError("Error updating category"));
            });
    };

    const removeCategory = (id) => {
        fetch(`http://127.0.0.1:8000/api/categories/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    dispatch(deleteCategory(id)); // Dispatch category removal
                } else {
                    console.error("Error deleting category");
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setCategoryError("Error deleting category"));
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <h1 className="text-3xl font-bold text-primary mb-4">Add a Category</h1>

            <form onSubmit={addNewCategory} className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-medium">Category Name</label>
                    <input
                        type="text"
                        id="category"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary">
                    Add Category
                </button>
            </form>

            <h2 className="text-2xl font-bold text-primary mb-4">Category List</h2>
            <ul className="space-y-4">
                {categories.map((category) => (
                    <li key={category.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                        <span className="text-lg font-medium text-gray-700">{category.name}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => setCurrentCategory(category)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => removeCategory(category.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {currentCategory && (
                <form onSubmit={modifyCategory} className="bg-white p-4 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Category</h2>
                    <input
                        type="text"
                        value={currentCategory.name}
                        onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                        required
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-4 flex justify-between">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentCategory(null)}
                            className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CategoriesList;
