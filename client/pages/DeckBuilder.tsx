import React, { useEffect, useState } from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import { api } from "../services/api";

interface AbilityUI {
    name: string;
    cost: number;
    description: string;
    fullDescription: string;
}

interface CardStats {
    health: number;
    shields: number;
    armor: number;
    overguard: number;
    maxEnergy: number;
    startingEnergy: number;
    faction: string;
    healthType: string;
}

interface CardMetadata {
    id: number;
    name: string;
    rarity: string;
    stats: CardStats;
    abilities: AbilityUI[];
}

// component for rows with stat info
const StatRow: ({
    label,
    value,
    type,
}: {
    label: string;
    value: string | number;
    type?: string;
}) => React.JSX.Element = ({ label, value, type }: { label: string; value: string | number; type?: string }) => (
    <div className="stat-row">
        <span className="stat-label">{label}</span>
        <span className={`stat-value ${type || ""}`}>{value}</span>
    </div>
);

//

//

//

export default function DeckBuilder({ user }: { user: string }) {
    const navigate: NavigateFunction = useNavigate();

    // Data State
    const [library, setLibrary]: [CardMetadata[], React.Dispatch<React.SetStateAction<CardMetadata[]>>] = useState<
        CardMetadata[]
    >([]);
    const [deck, setDeck]: [(CardMetadata | null)[], React.Dispatch<React.SetStateAction<(CardMetadata | null)[]>>] =
        useState<(CardMetadata | null)[]>(Array(20).fill(null));

    // UI State
    const [inspectedCard, setInspectedCard] = useState<{
        card: CardMetadata;
        source: "deck" | "library";
    } | null>(null);

    // Tracks which ability is currently expanded (null = list view)
    const [viewingAbilityIndex, setViewingAbilityIndex]: [
        number | null,
        React.Dispatch<React.SetStateAction<number | null>>,
    ] = useState<number | null>(null);

    // Initial Load
    useEffect((): void => {
        const fetchData = async () => {
            try {
                const res = await api.get("/api/library");
                setLibrary(res.data);
            } catch (err: unknown) {
                console.error("Failed to load library", err);
            }
        };
        fetchData();
    }, []);

    // Actions
    const closeInspector: () => void = (): void => {
        setInspectedCard(null);
        setViewingAbilityIndex(null);
    };

    const addToDeck: (card: CardMetadata) => void = (card: CardMetadata): void => {
        const firstEmpty: number = deck.findIndex((s: CardMetadata | null): boolean => s === null);
        if (firstEmpty !== -1) {
            const newDeck: (CardMetadata | null)[] = [...deck];
            newDeck[firstEmpty] = card;
            setDeck(newDeck);
            setLibrary((prev) => prev.filter((c) => c.id !== card.id));
            closeInspector();
        }
    };

    const removeFromDeck: (card: CardMetadata) => void = (card: CardMetadata): void => {
        const index = deck.findIndex((c) => c?.id === card.id);
        if (index !== -1) {
            const newDeck: (CardMetadata | null)[] = [...deck];
            newDeck[index] = null;
            setDeck(newDeck);
            setLibrary((prev) => [...prev, card]);
            closeInspector();
        }
    };

    const handleSave = async () => {
        const deckIds = deck.filter((c: CardMetadata | null) => c !== null).map((c: CardMetadata) => c!.id);
        await api.post("/api/deck", { username: user, deckIds });
        navigate("/");
    };

    const deckCount: number = deck.filter((c: CardMetadata | null) => c).length;

    return (
        <div className="deck-builder-container">
            <div className="builder-header">
                <div style={{ marginRight: "auto", paddingLeft: "20px" }}>
                    <h2>Arsenal // {user}</h2>
                </div>
                <button
                    className={`save-btn ${deckCount === 20 ? "ready" : "disabled"}`}
                    onClick={handleSave}
                    disabled={deckCount !== 20}
                >
                    {deckCount === 20 ? "Confirm Loadout" : `Equip Cards (${deckCount}/20)`}
                </button>
            </div>

            <div className="deck-grid">
                {deck.map((card, idx) => (
                    <div
                        key={idx}
                        className={`deck-slot ${!card ? "empty" : ""}`}
                        onClick={(): void | null => card && setInspectedCard({ card, source: "deck" })}
                    >
                        {card ? card.name : idx + 1}
                    </div>
                ))}
            </div>

            <div className="library-list">
                <h3>Available Modules</h3>
                <div className="card-row">
                    {library.map((card: CardMetadata) => (
                        <div
                            key={card.id}
                            className="library-card"
                            onClick={(): void => setInspectedCard({ card, source: "library" })}
                        >
                            {card.name}
                        </div>
                    ))}
                </div>
            </div>

            {inspectedCard && (
                <div
                    className="modal-overlay"
                    onClick={closeInspector}
                >
                    <div
                        className="warframe-inspector"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="inspector-header">
                            <h2>{inspectedCard.card.name}</h2>
                            <div style={{ color: "#888", fontSize: "12px" }}>{inspectedCard.card.rarity}</div>
                        </div>

                        <div className="inspector-body">
                            <div className="stats-column">
                                <StatRow
                                    label="Health"
                                    value={inspectedCard.card.stats.health}
                                    type="health"
                                />
                                <StatRow
                                    label="Shields"
                                    value={inspectedCard.card.stats.shields}
                                    type="shields"
                                />
                                <StatRow
                                    label="Armor"
                                    value={inspectedCard.card.stats.armor}
                                />
                                <StatRow
                                    label="Overguard"
                                    value={inspectedCard.card.stats.overguard}
                                    type="overguard"
                                />
                                <div style={{ height: "10px" }}></div>
                                <StatRow
                                    label="Max Energy"
                                    value={inspectedCard.card.stats.maxEnergy}
                                    type="energy"
                                />
                                <StatRow
                                    label="Start Energy"
                                    value={inspectedCard.card.stats.startingEnergy}
                                    type="energy"
                                />
                                <div style={{ height: "10px" }}></div>
                                <StatRow
                                    label="Faction"
                                    value={inspectedCard.card.stats.faction}
                                />
                                <StatRow
                                    label="Health Type"
                                    value={inspectedCard.card.stats.healthType}
                                />
                            </div>

                            <div className="abilities-section">
                                {viewingAbilityIndex === null ? (
                                    <>
                                        <h3>Abilities</h3>
                                        <div style={{ overflowY: "auto", maxHeight: "300px" }}>
                                            {inspectedCard.card.abilities.map((ab, i) => (
                                                <div
                                                    key={i}
                                                    className="ability-item"
                                                    onClick={() => setViewingAbilityIndex(i)}
                                                >
                                                    <div className="ability-top">
                                                        <span>{ab.name}</span>
                                                        <span className="ability-cost">{ab.cost} EN</span>
                                                    </div>
                                                    <div className="ability-desc">{ab.description}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="ability-detail-view">
                                        <button
                                            className="back-btn"
                                            onClick={() => setViewingAbilityIndex(null)}
                                        >
                                            ← BACK
                                        </button>

                                        <div className="detail-header">
                                            <div className="detail-title">
                                                {inspectedCard.card.abilities[viewingAbilityIndex].name}
                                            </div>
                                            <div className="detail-cost">
                                                Energy Cost: {inspectedCard.card.abilities[viewingAbilityIndex].cost}
                                            </div>
                                        </div>

                                        <div className="detail-body">
                                            <p
                                                style={{
                                                    fontStyle: "italic",
                                                    marginBottom: "20px",
                                                    color: "#ccc",
                                                }}
                                            >
                                                {inspectedCard.card.abilities[viewingAbilityIndex].description}
                                            </p>

                                            <div
                                                style={{
                                                    padding: "15px",
                                                    background: "#1a1a1a",
                                                    border: "1px solid #333",
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "10px",
                                                        color: "#666",
                                                        display: "block",
                                                        marginBottom: "8px",
                                                        letterSpacing: "1px",
                                                    }}
                                                >
                                                    STATS & MECHANICS
                                                </span>

                                                {inspectedCard.card.abilities[viewingAbilityIndex].fullDescription
                                                    .split("\n")
                                                    .map((line, idx) => (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                marginBottom: "4px",
                                                                color: line.includes(":") ? "#d4af37" : "#999",
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {line}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="inspector-footer">
                            <button onClick={closeInspector}>Close</button>

                            {inspectedCard.source === "library" ? (
                                <button
                                    style={{
                                        borderColor: "#d4af37",
                                        background: "rgba(212, 175, 55, 0.1)",
                                    }}
                                    onClick={() => addToDeck(inspectedCard.card)}
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    style={{
                                        borderColor: "#ff5555",
                                        color: "#ff5555",
                                    }}
                                    onClick={() => removeFromDeck(inspectedCard.card)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
