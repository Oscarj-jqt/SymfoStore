import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsList from "./components/ProductsList";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<ProductsList />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
