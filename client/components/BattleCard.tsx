import React from "react";

import { CardDTO } from "../../interfaces/protocol";

interface Props {
    card: CardDTO;
    isEnemy: boolean;
    isSelected: boolean;
    onClick: () => void;
    onCast?: (abilityIndex: number) => void;
}

export const BattleCard: React.FC<Props> = ({ card, isEnemy, isSelected, onClick, onCast }): React.JSX.Element => {
    const getPct: (current: number, max: number) => number = (current: number, max: number): number => {
        if (max === 0) {
            return 0;
        }
        return Math.max(0, Math.min(100, (current / max) * 100));
    };

    return (
        <div
            className={`battle-card ${isEnemy ? "enemy" : "player"} ${isSelected ? "selected" : ""}`}
            onClick={onClick}
        >
            {!isEnemy && onCast && (
                <div className="ability-overlay">
                    {card.abilities.map((ab, idx) => (
                        <button
                            key={idx}
                            className="ability-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onCast(idx);
                            }}
                        >
                            {ab.name} ({ab.cost})
                        </button>
                    ))}
                </div>
            )}

            <div className="card-image-area">{card.name}</div>

            <div className="card-stats-bars">
                {card.maxOverguard > 0 && (
                    <div className="stat-bar-track">
                        <div
                            className="stat-bar-fill fill-overguard"
                            style={{ width: `${getPct(card.overguard, card.maxOverguard)}%` }}
                        />
                    </div>
                )}
                {card.maxShields > 0 && (
                    <div className="stat-bar-track">
                        <div
                            className="stat-bar-fill fill-shield"
                            style={{ width: `${getPct(card.shields, card.maxShields)}%` }}
                        />
                    </div>
                )}
                <div className="stat-bar-track">
                    <div
                        className="stat-bar-fill fill-health"
                        style={{ width: `${getPct(card.health, card.maxHealth)}%` }}
                    />
                </div>
                <div className="hp-text">
                    {card.health}/{card.maxHealth}
                </div>
            </div>
        </div>
    );
};
