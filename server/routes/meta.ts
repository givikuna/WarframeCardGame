import express from "express";

import * as _ from "underscore";

import { SerializedCard } from "../../interfaces/protocol";

import { Nullable } from "ts-toolbelt/out/Union/Nullable";
import { CardData } from "../../types/types";

import { users } from "../store";

import { serializeCard } from "../../modules/helpers/serializeCard";

import { cards } from "../../cards/cards";

const router: express.Router = express.Router();

router.post("/login", (req: express.Request, res: express.Response): void => {
    const { username } = req.body;

    if (!users[username]) {
        users[username] = { id: username, deck: [] };
    }

    res.json({ username, deck: users[username].deck });
});

router.get("/library", (_req: express.Request, res: express.Response): void => {
    const library: SerializedCard[] = Object.values(cards).map(serializeCard);
    res.json(library);
});

router.get("/deck", (req: express.Request, res: express.Response): void => {
    const { username } = req.body;

    if (Object.keys(users).includes(username)) {
        if (Object.keys(users[username]).includes("deck")) {
            res.json(users[username]["deck"]);
        } else {
            res.status(404).json({ error: "User deck not found" });
        }
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.post("/deck", (req: express.Request, res: express.Response): void => {
    const { username, deckIds } = req.body;
    if (users[username]) {
        users[username].deck = deckIds;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.post("/play-check", (req, res) => {
    const { username } = req.body;
    const user: Nullable<{ id: string; deck: number[] }> = users[username];

    if (user) {
        if (user.deck.length !== 20) {
            const allIds = Object.values(cards).map((c: CardData) => c.id);

            user.deck = Array.from({ length: 20 }, (): number => allIds[Math.floor(Math.random() * allIds.length)]);
        }
        res.json({ ready: true, deck: user.deck });
    } else {
        res.status(404).send("User not found");
    }
});

export default router;
