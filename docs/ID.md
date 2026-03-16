IDs will be assigned to everything in the game, whether in-game or in storage.

UID vs IID;
UID (Unique ID): used as a permanent unique ID assigned to objects that require it. Such as players, decks, cards, actions, and such.
IID (Internal ID): used as a temporary unique ID assigned to the same objects but when in-game in order to know what instance of which object did what.

UID:
formats:
players: P[letters A-Z][5 digits 00001-99999]
decks: D[letters A-Z][7 digtis 0000001-9999999]
cards: C[Card Class Identifier (first two letters)][3 digits 001-999]
actions: A[2 digits 01-99][ID of the card it works for]

IID:
formats:
players: I[player number (1 or 2)][player ID]
decks: I[deck ID]
cards: I[001-999][player number (1 or 2)][card ID]
actions: I[001-999][action ID]
