# Contributing to Warframe Card Game

Thank you for your interest in contributing! Since this is a fan-made passion project, help is always welcome—whether that's adding new cards, balancing mechanics, or fixing bugs in the engine.

## Code of Conduct

Please treat all contributors with respect. Constructive feedback is welcome; toxic behavior is not.

## How to Contribute

### 1. Reporting Bugs
If you find a bug (e.g., a status effect not resolving correctly, or a websocket disconnect issue), please open an issue in the repository. Provide:
* A clear description of the issue.
* Steps to reproduce the bug.
* Any relevant error logs from the server console or browser console.

### 2. Suggesting Features and Balancing
If you have an idea for a new card, Cephalon, Focus School, or mechanic adjustment:
* Check the `docs/` folder to ensure it doesn't conflict with existing rules.
* Open an issue tagged as "Feature" or "Balance" to discuss it before writing code.

### 3. Pull Requests
1.  **Fork** the repository.
2.  **Create** a new branch (`git checkout -b feature/new-card-name` or `fix/status-effect-bug`).
3.  **Commit** your changes following a clear, descriptive format.
4.  **Push** to the branch (`git push origin feature/new-card-name`).
5.  **Open a Pull Request** and describe the changes you made.

## Development Guidelines

### TypeScript Strictness
This project uses highly strict TypeScript settings (`strict: true`, `noImplicitAny: false`, `noImplicitReturns: true`). Ensure your code compiles without warnings before submitting a PR.

### Code Formatting
We use Prettier for code formatting. Please ensure your editor is configured to use the local `.prettierrc` file, which enforces:
* Tab width: 4
* Print width: 115
* Trailing commas
* Semi-colons

### Adding New Cards
Cards are defined purely in code, not in external JSON files, to allow for complex lambda functions in their actions.

1.  Create a new TypeScript file in `db/cards/cards/` (e.g., `MyCard.ts`).
2.  Export an object implementing the `ICard` interface.
3.  Use the `Action` class to define its abilities, hooking into the `ActionType` enums (OnPlay, OnTurn, Ongoing).
4.  Register the new card in `db/cards/cards.ts` by adding it to the exported dictionary.
5.  Document the card in `docs/for-players/cards/`.

### Modifying Mechanics
If you are adding a new mechanic (Focus School, Cephalon, Faction Syndicate, or Status Effect):
1.  Add the logic to the appropriate folder inside `classes/mechanics/` or `classes/statusEffects/`.
2.  Ensure you implement the required interfaces (e.g., `IFocusSchoolAbility`, `StatusEffect`).
3.  Register the new mechanic in the central `constants/classConstants.ts` or `constants/constants.ts` maps so the Factories can instantiate them correctly.
4.  Update the relevant documentation in `docs/for-players/game/`.
