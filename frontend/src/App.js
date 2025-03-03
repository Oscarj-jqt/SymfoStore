import React from 'react';
// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import ProductsList from "./components/ProductsList.jsx";
// import CategoriesList from "./components/CategoriesList.jsx";
import { useEffect} from "react";

import Login from "./components/Login";


function App() {
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/admin/category")
    //         .then((res) => res.json())
    //         .then((data) => console.log(data))
    //         .catch((err) => console.error("API error:", err));
    // }, []);

    return (
        <div>
            <h1>Test JWT Auth</h1>
            <Login />
        </div>
    );
}
// const App = () => {
//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-gray-100 p-6">
//         <CategoriesList />
//         <ProductsList />
//       </div>
//     </Provider>
//   );
// };

export default App;
