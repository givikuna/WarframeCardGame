# Warframe Card Game — Status Effects

---

## Elemental Status Effects

| Effect | What it does | Stacks | Duration | Notes |
|---|---:|:---:|:---:|---|
| **Impact** | +**8% finisher chance** per proc | **Max 5** | **3 turns** | Procs cannot be inflicted if the card has Overguard |
| **Puncture** | +**5% critical-vulnerability** per proc | **Unlimited** | **3 turns** | Vulnerability increases chance for critical hits against target |
| **Slash** | **35% of applied base damage / turn** | **Unlimited** | **3 turns** | **Bypasses armor** (applies directly to health) |
| **Heat** | deals **50% base damage /turn** | — | **2 turns** | Both effects originate from each Heat proc |
| **Cold** | At **5 procs → Freeze** (target unusable by opponent). **0.05 increased critical damage per proc** | **Max 10** | **3 turns per proc** | Freeze activates the moment the 5th proc applies |
| **Electricity** | **50% base damage /turn** for 2 turns; **15% chance** to spread to other cards at location | — | **2 turns** | Spread applies to other enemy cards at same location |
| **Toxin** | **50% base damage /turn** for 2 turns | — | **2 turns** | **Bypasses shields** (applies directly to health or overguard that isn't a shield) |
| **Blast** | **30% base damage** after **2 turns** per proc; special explosion rules | **Max 10 (recommended)** | **2 turns per proc** | At **10 stacks**: each blast proc explodes for **300%** base damage. On **death**: remaining procs explode for **50%** base damage. Explosion is **AOE at the location**. |
| **Corrosive** | **-26% armor** on first proc; **-8%** on subsequent procs | **Max 10** | **4 turns per proc** | Apply multiplicatively or as defined by engine (recommend additive reduction capped logically) |
| **Gas** | Applies to **all enemy cards at this location** automatically; **50% base damage /turn** | **Max 10** | **2 turns** | Single proc to one enemy spreads to all enemies in that location (so stack count increments across the location) |
| **Magnetic** | **+100% damage to shields/overguard** on first proc; **+25%** each subsequent | — | **4 turns** | On shield/overguard **break** while Magnetic present: inflict an **Electricity proc** |
| **Radiation** | Each proc: **5% chance** attacks target a **random ally**; affected cards deal **+50% damage to allied cards** | **Max 10** | **3 turns** |
| **Viral** | **+100% health damage** on first proc, **+25%** per additional up to **+325%** total | **Max 10** | **2 turns** | Only amplifies damage done *to health* (not shields/overguard unless treated as health) |
| **Void** | Redirects projectile attacks to Void-affected card(s) | **3** | **3 turns** | If multiple Void targets exist and the chosen target is **not** Void-affected, a **random Void** card is attacked instead |
| **Tau** | **+10% status chance per proc** | **Max 10** | **8 turns** | Increases chance to apply other status procs from cards affected by Tau |

---

## Functional Status Effects

> (You called these "Functional" — renamed here to **Tactical Effects** to sound cooler; change the heading if you prefer the original.)

| Effect | What it does | Limit |
|---|---:|:---:|
| **Disabled** | Card is **unable to act** for **1 turn** | Only **1** Disable proc can exist on a card at a time |
| **Flying** | Card **cannot be attacked by melee** attacks | Only **1** Flying proc at a time |
| **Disarmed** | Card **cannot use weapon-based abilities** | Only **1** Disarmed proc at a time |
| **Invisible** | Card **cannot be selected or seen** by the enemy (still takes AOE & location effects) | Only **1** Invisible proc at a time |
| **Invincible** | Card **cannot take damage** (still receives non-damaging effects) | Only **1** Invincible proc at a time |
| **Blinded** | Card's **targeting becomes random** — abilities affect a random valid card | Only **1** Blinded proc at a time |

---

## Implementation Notes & Suggestions

- **Display:** For each card show a compact list like `Impact x3 (2 turns), Viral x2 (1 turn)` so players can read stacks & remaining durations at a glance.
- **Proc Resolution Order:** When multiple effects trigger at the same moment, resolve in this priority (suggested): **Damage-over-time → Shield/Armor changes → On-break triggers (Magnetic) → Death explosions (Blast)**. Adjust as needed for balance.
- **Stacking semantics:** Decide whether stack **applications refresh** duration or create independent timers per proc. The rules above assume **each proc has its own lifespan** unless listed otherwise (e.g., Slash/Heat durations are fixed per application).
- **Rounding:** Use consistent rounding for fractional damage (round down to nearest integer or accumulate fractional damage and apply when ≥1).
- **UI:** Consider color-coding elemental groups and using small icons for each status to reduce reading time.

---
