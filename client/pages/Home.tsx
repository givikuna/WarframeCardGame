import React from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

export default function Home({ user }: { user: string }): React.JSX.Element {
    const navigate = useNavigate();

    const handlePlay: () => Promise<void> = async (): Promise<void> => {
        try {
            await api.post("/api/play-check", { username: user });

            navigate("/game");
        } catch (e: unknown) {
            alert("Error starting game. Check console.");
            console.error(e);
        }
    };

    return (
        <div
            className="main-menu"
            style={{ textAlign: "center", marginTop: "100px" }}
        >
            <h1 style={{ fontSize: "48px", color: "#d4af37" }}>Welcome, {user}!</h1>

            <div
                className="menu-buttons"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                    marginTop: "50px",
                }}
            >
                <button
                    style={{ width: "200px" }}
                    onClick={() => navigate("/deck")}
                >
                    Deck Builder
                </button>

                <button
                    style={{ width: "200px", borderColor: "#d4af37", color: "#d4af37" }}
                    onClick={handlePlay}
                >
                    PLAY
                </button>

                <a
                    href="https://github.com/givikuna/WarframeCardGame"
                    target="_blank"
                >
                    <button style={{ width: "200px" }}>GitHub</button>
                </a>
            </div>
        </div>
    );
}
