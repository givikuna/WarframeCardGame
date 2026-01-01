import { StatusEffectType } from "./types";

// 1. Data Transfer Objects (DTOs)
// We strip methods from your Classes and only send raw data to the client
export interface AbilityDTO {
    name: string;
    cost: number;
    description?: string; // You might want to add this to your Ability class later
}

export interface CardDTO {
    id: string; // Unique instance ID (needed to track specific cards on board)
    name: string;
    // The Layers
    health: number;
    maxHealth: number;
    shields: number;
    maxShields: number;
    overguard: number;
    maxOverguard: number;
    energy: number;
    maxEnergy: number;
    // Visuals
    procs: Partial<Record<StatusEffectType, number>>; // Type -> Stack Count
    abilities: AbilityDTO[];
    locationIndex: number; // 0, 1, or 2 (BoardLocation)
    owner: 0 | 1 | 2;

    armor: number;
    baseArmor: number; // maybe not
}

export interface GameStateDTO {
    locations: {
        player1Cards: CardDTO[];
        player2Cards: CardDTO[];
    }[];
    turn: number;
}

// 2. Events
export interface ServerToClientEvents {
    // The "Big Update" - syncs the whole board
    gameStateUpdate: (state: GameStateDTO) => void;

    // "Micro Updates" - for animations/popups
    damageDealt: (event: {
        targetId: string;
        amount: number;
        type: "Health" | "Shield" | "Overguard";
        isCrit: boolean;
    }) => void;

    error: (msg: string) => void;
}

export interface ClientToServerEvents {
    playCard: (cardId: number, locationIndex: number) => void;
    castAbility: (params: { casterId: string; abilityIndex: number; targetIds: string[] }) => void;
    endTurn: () => void;
}
