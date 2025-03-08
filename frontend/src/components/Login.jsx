import { useState } from "react";
import ProductsList from "./ProductsList";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

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
                setMessage("Erreur : mail ou mot de passe erroné " + data.message);
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
                    <p>{message}</p>
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
