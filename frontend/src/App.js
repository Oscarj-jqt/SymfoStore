import React from 'react';
import Login from "./components/Login";
import { Provider } from 'react-redux';
import store from './redux/store.js';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";

// import ProductsList from "./components/ProductsList.jsx";
// import CategoriesList from "./components/CategoriesList.jsx";
// import { useEffect} from "react";



function App() {

    return (

        <Provider store={store}>
            <div>
                <Login />
            </div>
        </Provider>

    );
}

export default App;
