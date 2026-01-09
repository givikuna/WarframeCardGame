import React, { useState } from "react";

import axios from "axios";

import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Login({ setUser }: { setUser: (u: string) => void }): React.JSX.Element {
    const [input, setInput]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");
    const navigate: NavigateFunction = useNavigate();

    const handleLogin: () => Promise<void> = async (): Promise<void> => {
        if (!input.trim()) return;
        try {
            await axios.post("/api/login", { username: input });
            setUser(input);
            navigate("/");
        } catch (e: unknown) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-screen">
            <h1>Warframe Card Game</h1>
            <input
                placeholder="Enter Username"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value)}
            />
            <button onClick={handleLogin}>Enter System</button>
        </div>
    );
}
