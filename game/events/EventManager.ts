import { GameEventPayload } from "../../interfaces/GameEventPayload";

import { GameEventType, EventHandler } from "../../types/types";

export class EventManager {
    private listeners: Partial<Record<GameEventType, any[]>> = {};

    private constructor() {}

    public static init(): EventManager {
        return new EventManager();
    }

    public subscribe<K extends GameEventType>(event: K, handler: EventHandler<GameEventPayload[K]>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(handler);
    }

    public unsubscribe<K extends GameEventType>(event: K, handler: EventHandler<GameEventPayload[K]>): void {
        if (!this.listeners[event]) return;

        this.listeners[event] = this.listeners[event]!.filter(
            (h: EventHandler<GameEventPayload[K]>): boolean => h !== handler,
        );
    }

    public emit<K extends GameEventType>(event: K, payload: GameEventPayload[K]): void {
        if (!this.listeners[event]) return;

        this.listeners[event]!.forEach((handler) => handler(payload));
    }
}
