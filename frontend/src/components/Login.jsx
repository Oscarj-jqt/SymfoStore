import { useState } from "react";
import ProductsList from "./ProductsList";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const validateEmail = (email) => {
        // Vérifie si l'email est valide avec une regex simple
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation côté front
        if (!validateEmail(email)) {
            setMessage("Veuillez entrer un email valide.");
            return;
        }

        if (password.length < 6) {
            setMessage("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                setMessage("Connexion réussie !");
                setIsLoggedIn(true);
            } else {
                setMessage("Erreur : " + data.message);
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <>
                    <h2>Connexion</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Se connecter</button>
                    </form>
                    <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
                </>
            ) : (
                <>
                    <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
                    <ProductsList />
                </>
            )}
        </div>
    );
};

export default Login;
