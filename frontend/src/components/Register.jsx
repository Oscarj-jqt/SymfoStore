import { useState } from "react";
import { Link } from "react-router-dom";
import ProductsList from "./ProductsList";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                setMessage("Inscription réussie !");
                setIsRegistered(true);
            } else {
                setMessage("Erreur : " + data.message);
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">S'inscrire</button>
            </form>
            <p>{message}</p>

            {/* Ajout du lien vers /login */}
            <p>
                Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
        </div>
    );
};

export default Register;
