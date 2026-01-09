import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import * as _ from "underscore";

import { BattleCard } from "../components/BattleCard";
import { GameStateDTO, CardDTO, CardBeforePlayDTO } from "../../interfaces/protocol";

import { DamagePreview } from "../../types/types";

import { DefaultEventsMap } from "socket.io";

import { api } from "../services/api";

import "../game.css";
import { Nullable } from "ts-toolbelt/out/Union/Nullable";

export default function GamePage(): React.JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState<GameStateDTO | null>(null);

    // selection
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [castingState, setCastingState] = useState<{
        casterId: string;
        abilityIndex: number;
        abilityName: string;
    } | null>(null);

    // visual
    const [damageQueue, setDamageQueue] = useState<DamagePreview[]>([]);
    const [draggingCard, setDraggingCard] = useState<CardBeforePlayDTO | null>(null);

    // - - - -

    useEffect((): (() => void) => {
        const initGame: () => Promise<void> = async (): Promise<void> => {
            const newSocket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            setSocket(newSocket);

            newSocket.on("connect", async (): Promise<void> => {
                const username: string = "Tenno"; // temporarily using Tenno as the only username

                try {
                    const res = await api.post("/api/play-check", { username });
                    newSocket.emit("requestGameStart", { deckIds: res.data.deck });
                } catch (e) {
                    console.warn("No deck found. Requesting Random Arsenal.");
                    newSocket.emit("requestGameStart", { deckIds: _.range(1, 21) });
                }
            });

            newSocket.on("gameStateUpdate", (state: GameStateDTO) => {
                setGameState(state);
            });

            // Damage Animation
            newSocket.on(
                "damageDealt",
                (data: { type: "Shield" | "Health" | "Overguard"; targetId: string; damage: number }) => {
                    let color: string = "#FF0000";

                    if (data.type === "Shield") {
                        color = "#00BFFF";
                    } else if (data.type === "Overguard") {
                        color = "#A020F0";
                    }

                    const id: number = Date.now() + Math.random();
                    setDamageQueue((prev: DamagePreview[]): DamagePreview[] => [
                        ...prev,
                        { id, targetId: data.targetId, val: data.damage, color },
                    ]);

                    setTimeout(() => {
                        setDamageQueue((prev: DamagePreview[]): DamagePreview[] =>
                            prev.filter((item: DamagePreview): boolean => item.id !== id),
                        );
                    }, 1000);
                },
            );
        };

        initGame();
        return (): void => {
            socket?.disconnect();
        };
    }, []);

    // - - - -

    const handleEndTurn: () => void = (): void => {
        if (socket) {
            socket.emit("endTurn");
            setSelectedId(null);
            setCastingState(null);
        }
    };

    const handleCardClick: (card: CardBeforePlayDTO, isEnemy: boolean) => void = (
        card: CardBeforePlayDTO,
        isEnemy: boolean,
    ): void => {
        if (castingState && socket) {
            if (isEnemy) {
                socket.emit("requestCastAbility", {
                    casterId: castingState.casterId,
                    abilityIndex: castingState.abilityIndex,
                    targetIds: [card.id],
                });
                setCastingState(null);
                return;
            } else {
                setCastingState(null); // cancel if clicked friendly
            }
        }

        if (!isEnemy) {
            // card selecting
            setSelectedId((prev) => (prev === card.id ? null : card.id));
            setCastingState(null);
        } else {
            // card to attack
            if (selectedId && socket) {
                socket.emit("requestAttack", { sourceId: selectedId, targetId: card.id });
                setSelectedId(null);
            }
        }
    };

    const handleAbilityClick: (card: CardDTO, idx: number) => void = (card: CardDTO, idx: number): void => {
        const abilityName: string = card.abilities[idx].name;
        setCastingState({
            casterId: card.id,
            abilityIndex: idx,
            abilityName: abilityName,
        });
        setSelectedId(null);
    };

    // drag & drop of cards
    const onDragStart: (e: React.DragEvent, card: CardBeforePlayDTO) => void = (
        e: React.DragEvent,
        card: CardBeforePlayDTO,
    ): void => {
        setDraggingCard(card);
        e.dataTransfer.setData("text/plain", JSON.stringify(card));
        e.dataTransfer.effectAllowed = "move";
    };

    const onDragOver: (e: React.DragEvent) => void = (e: React.DragEvent): void => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onDrop: (e: React.DragEvent, locationIndex: number) => void = (
        e: React.DragEvent,
        locationIndex: number,
    ): void => {
        e.preventDefault();
        if (draggingCard && socket) {
            socket.emit("requestPlayCard", {
                cardTemplateId: draggingCard.templateId || 1,
                locationIndex: locationIndex,
            });
            setDraggingCard(null);
        }
    };

    // Renderers
    const renderLocation: (locIndex: number) => Nullable<React.JSX.Element> = (
        locIndex: number,
    ): Nullable<React.JSX.Element> => {
        if (!gameState) return null;
        const loc = gameState.locations[locIndex];

        return (
            <div
                className={`location-column ${draggingCard ? "drag-active" : ""}`}
                key={locIndex}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, locIndex)}
            >
                <div className="card-zone enemy-zone">
                    {loc.player2Cards.map(
                        (card: CardDTO): React.JSX.Element => (
                            <BattleCardWrapper
                                key={card.id}
                                card={card}
                                isEnemy={true}
                                isSelected={!!castingState}
                                onClick={() => handleCardClick(card, true)}
                                damages={damageQueue.filter((d) => d.targetId === card.id)}
                            />
                        ),
                    )}
                </div>

                <div className="zone-divider"></div>

                <div className="card-zone player-zone">
                    {loc.player1Cards.map(
                        (card: CardDTO): React.JSX.Element => (
                            <BattleCardWrapper
                                key={card.id}
                                card={card}
                                isEnemy={false}
                                isSelected={selectedId === card.id || castingState?.casterId === card.id}
                                onClick={(): void => handleCardClick(card, false)}
                                onCast={(idx: number): void => handleAbilityClick(card, idx)}
                                damages={damageQueue.filter((d: DamagePreview) => d.targetId === card.id)}
                            />
                        ),
                    )}
                </div>
            </div>
        );
    };

    if (!gameState)
        return (
            <div style={{ color: "white", textAlign: "center", marginTop: 100 }}>Initializing Combat Protocols...</div>
        );

    return (
        <div className="game-container">
            {/* turn counter */} {/* to-do: broken, fix */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textShadow: "0 0 10px #d4af37",
                }}
            >
                TURN {gameState.turn + 1}
            </div>
            <h2 className="game-header">Combat Simulation</h2>
            {/* end turn button */}
            <div
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    zIndex: 200,
                }}
            >
                <button
                    onClick={handleEndTurn}
                    style={{
                        padding: "15px 30px",
                        background: "#d4af37",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
                    }}
                >
                    END TURN
                </button>
            </div>
            <div className="battlefield-grid">
                {renderLocation(0)}
                {renderLocation(1)}
                {renderLocation(2)}
            </div>
            {/* hand */}
            <div className="player-hand-container">
                {gameState.hand.cards.map((card: CardBeforePlayDTO, i: number): React.JSX.Element => {
                    const displayCard: CardDTO = {
                        // mocking CardDTO
                        ...card,
                        owner: 1,
                        locationIndex: -1,
                        procs: card.procs || {},
                    } as unknown as CardDTO;

                    return (
                        <div
                            key={i}
                            className="hand-card-wrapper"
                            draggable={true}
                            onDragStart={(e) => onDragStart(e, card)}
                        >
                            <BattleCard
                                card={displayCard}
                                isEnemy={false}
                                isSelected={false}
                                onClick={() => {}}
                            />
                        </div>
                    );
                })}
            </div>
            <div
                style={{
                    color: "#d4af37",
                    marginTop: "20px",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                {castingState
                    ? `SELECT TARGET FOR ${castingState.abilityName}`
                    : selectedId
                    ? "SELECT HOSTILE TO ATTACK (SAME ZONE)"
                    : "SELECT UNIT // DRAG TO DEPLOY"}
            </div>
        </div>
    );
}

// keep the any
const BattleCardWrapper: (a: any) => React.JSX.Element = ({
    card,
    isEnemy,
    isSelected,
    onClick,
    onCast,
    damages,
}: any): React.JSX.Element => {
    return (
        <div style={{ position: "relative" }}>
            <BattleCard
                card={card}
                isEnemy={isEnemy}
                isSelected={isSelected}
                onClick={onClick}
                onCast={onCast}
            />
            {damages.map(
                (d: DamagePreview): React.JSX.Element => (
                    <div
                        key={d.id}
                        className="floating-damage"
                        style={{ color: d.color, top: "50%", left: "50%" }}
                    >
                        -{d.val}
                    </div>
                ),
            )}
        </div>
    );
};
