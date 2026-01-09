import React, { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import DeckBuilder from "./pages/DeckBuilder";
import GamePage from "./pages/GamePage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const App: () => React.JSX.Element = (): React.JSX.Element => {
    const [user, setUser]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<
        string | null
    >(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login setUser={setUser} />}
                />

                {}

                <Route
                    path="/"
                    element={user ? <Home user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/deck"
                    element={user ? <DeckBuilder user={user} /> : <Navigate to="/login" />}
                />

                {}

                <Route
                    path="/game"
                    element={user ? <GamePage /> : <Navigate to="/login" />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
};
