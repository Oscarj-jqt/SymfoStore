import { useState } from "react";

const TestConnection = () => {
    const [message, setMessage] = useState("");

    const testConnection = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/test");
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Erreur de connexion au backend");
        }
    };

    return (
        <div>
            <button onClick={testConnection}>Tester connexion</button>
            <p>{message}</p>
        </div>
    );
};

export default TestConnection;
