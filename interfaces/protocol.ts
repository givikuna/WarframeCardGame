import { Faction, HealthType, Rarity } from "../types/types";

// Serializations

export interface SerializedAbility {
    name: string;
    cost: number;
    description: string;
    fullDescription: string;
}

export interface SerializedCard {
    id: number;
    name: string;
    rarity: Rarity;
    stats: {
        health: number;
        shields: number;
        armor: number;
        overguard: number;
        maxEnergy: number;
        startingEnergy: number;
        faction: Faction;
        healthType: HealthType;
    };
    abilities: SerializedAbility[];
}

// DTOs

export interface AbilityDTO {
    name: string;
    cost: number;
    description: string;
    fullDetails: string;
}

export interface CardBeforePlayDTO {
    id: string; // unique instance id
    templateId: number; // db id
    name: string;

    health: number;
    maxHealth: number;
    shields: number;
    maxShields: number;
    overguard: number;
    maxOverguard: number;
    armor: number;
    baseArmor: number;
    energy: number;
    maxEnergy: number;
    startingEnergy: number;

    faction: string;
    healthType: string;
    rarity: string;

    abilities: AbilityDTO[];
    procs: Record<string, number>;
}

export interface CardDTO extends CardBeforePlayDTO {
    owner: 1 | 2;
    locationIndex: 0 | 1 | 2;
}

export interface LocationStateDTO {
    player1Cards: CardDTO[];
    player2Cards: CardDTO[];
}

export interface GameStateDTO {
    locations: [LocationStateDTO, LocationStateDTO, LocationStateDTO];
    hand: HandDTO;
    turn: number;
    activePlayer: 1 | 2;
}

export interface HandDTO {
    cards: CardBeforePlayDTO[];
}

// Socket Events

export interface ClientToServerEvents {
    // Game Flow
    requestGameStart: (data: { deckIds: number[] }) => void;
    endTurn: () => void;

    // Actions
    requestAttack: (data: { sourceId: string; targetId: string }) => void;

    requestCastAbility: (data: { casterId: string; abilityIndex: number; targetIds: string[] }) => void;

    requestPlayCard: (data: { cardTemplateId: number; locationIndex: number }) => void;
}

export interface ServerToClientEvents {
    // State Sync
    gameStateUpdate: (state: GameStateDTO) => void;

    // Visual FX Triggers
    damageDealt: (data: {
        targetId: string;
        damage: number;
        type: "Health" | "Shield" | "Overguard" | "Miss";
        isCrit?: boolean;
    }) => void;

    abilityUsed: (data: { casterId: string; abilityName: string }) => void;

    // System Messages
    error: (message: string) => void;
    gameMessage: (message: string) => void;
}
