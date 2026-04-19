import { Impact } from "../classes/statusEffects/Impact";
import { Puncture } from "../classes/statusEffects/Puncture";
import { Slash } from "../classes/statusEffects/Slash";
import { Cold } from "../classes/statusEffects/Cold";
import { Electricity } from "../classes/statusEffects/Electricity";
import { Heat } from "../classes/statusEffects/Heat";
import { Toxin } from "../classes/statusEffects/Toxin";
import { Blast } from "../classes/statusEffects/Blast";
import { Corrosive } from "../classes/statusEffects/Corrosive";
import { Gas } from "../classes/statusEffects/Gas";
import { Magnetic } from "../classes/statusEffects/Magnetic";
import { Radiation } from "../classes/statusEffects/Radiation";
import { Viral } from "../classes/statusEffects/Viral";
import { Void } from "../classes/statusEffects/Void";
import { Tau } from "../classes/statusEffects/Tau";

import { Welled } from "../classes/statusEffects/Welled";
import { Magnetized } from "../classes/statusEffects/Magnetized";
import { MindControlled } from "../classes/statusEffects/MindControlled";
import { Spores } from "../classes/statusEffects/Spores";
import { Inked } from "../classes/statusEffects/Inked";
import { Roaring } from "../classes/statusEffects/Roaring";
import { Crystallized } from "../classes/statusEffects/Crystallized";
import { Webbed } from "../classes/statusEffects/Webbed";
import { Terrified } from "../classes/statusEffects/Terrified";
import { Lantern } from "../classes/statusEffects/Lantern";
import { Haste } from "../classes/statusEffects/Haste";

import { Flying } from "../classes/statusEffects/Flying";
import { Invisible } from "../classes/statusEffects/Invisible";
import { Invincible } from "../classes/statusEffects/Invincible";
import { Taunting } from "../classes/statusEffects/Taunting";
import { Disabled } from "../classes/statusEffects/Disabled";
import { Blinded } from "../classes/statusEffects/Blinded";
import { Disarmed } from "../classes/statusEffects/Disarmed";
import { Impaired } from "../classes/statusEffects/Impaired";
import { Lifted } from "../classes/statusEffects/Lifted";
import { Immune } from "../classes/statusEffects/Immune";

import { StatusEffectType } from "../types/enums";
import { Card } from "../classes/Card";
import { Effect } from "../interfaces/Effect";
import { StatusEffect } from "../classes/StatusEffect";

export const STATUS_EFFECT_MAP: Record<
    StatusEffectType,
    new (to: Card, by: Card | Effect, duration: number) => StatusEffect
> = {
    [StatusEffectType.Impact]: Impact,
    [StatusEffectType.Puncture]: Puncture,
    [StatusEffectType.Slash]: Slash,
    [StatusEffectType.Cold]: Cold,
    [StatusEffectType.Electricity]: Electricity,
    [StatusEffectType.Heat]: Heat,
    [StatusEffectType.Toxin]: Toxin,
    [StatusEffectType.Blast]: Blast,
    [StatusEffectType.Corrosive]: Corrosive,
    [StatusEffectType.Gas]: Gas,
    [StatusEffectType.Magnetic]: Magnetic,
    [StatusEffectType.Radiation]: Radiation,
    [StatusEffectType.Viral]: Viral,
    [StatusEffectType.Void]: Void,
    [StatusEffectType.Tau]: Tau,
    [StatusEffectType.Welled]: Welled,
    [StatusEffectType.Magnetized]: Magnetized,
    [StatusEffectType.MindControlled]: MindControlled,
    [StatusEffectType.Spores]: Spores,
    [StatusEffectType.Inked]: Inked,
    [StatusEffectType.Roaring]: Roaring,
    [StatusEffectType.Crystallized]: Crystallized,
    [StatusEffectType.Webbed]: Webbed,
    [StatusEffectType.Terrified]: Terrified,
    [StatusEffectType.Lantern]: Lantern,
    [StatusEffectType.Haste]: Haste,
    [StatusEffectType.Flying]: Flying,
    [StatusEffectType.Invisible]: Invisible,
    [StatusEffectType.Invincible]: Invincible,
    [StatusEffectType.Taunting]: Taunting,
    [StatusEffectType.Disabled]: Disabled,
    [StatusEffectType.Blinded]: Blinded,
    [StatusEffectType.Disarmed]: Disarmed,
    [StatusEffectType.Impaired]: Impaired,
    [StatusEffectType.Lifted]: Lifted,
    [StatusEffectType.Immune]: Immune,
};
