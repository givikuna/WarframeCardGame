import { StatusEffectType } from "../types/types";

import { DoTProcs } from "../constants/constants";

export function isDoT(proc: StatusEffectType): boolean {
    return DoTProcs.includes(proc);
}
