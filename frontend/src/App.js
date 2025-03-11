import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsList from "./components/ProductsList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Route protégée */}
                    <Route path="/products" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
