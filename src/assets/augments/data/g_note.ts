import { ActionContext } from "../../ContextAction";
import { StatEnum, StatObject, statObject } from "../../stat";
import { Augment } from "../augment";
import { GroupEnumAugment } from "../groupEnum";

export const G_NOTE: Augment[] = [];

const makeAugmentNote = (
  name: string,
  level: number,
  getAwareStatObject: (ctx: ActionContext) => StatObject,
  searchable_terms: string[],
): Augment => {
  return Augment.create(
    name,
    level,
    GroupEnumAugment.NOTE,
    [GroupEnumAugment.NOTE],
    getAwareStatObject,
    searchable_terms,
  );
};

// --------------------------------------
// ael
// exploration
// a | b | c | d
// a
G_NOTE.push(
  makeAugmentNote(
    "Ael Note A",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 5,
        [StatEnum.CORE_PP]: 3,
      });
    },
    [StatEnum.CORE_HP, StatEnum.CORE_PP],
  ),
);

(() => {
  // b | c | d
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["B", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["C", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
    ["D", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
  ];
  const WEAPON_UP: number = 1.01;
  for (const entry of DATA_ENTRY) {
    const [suffix, [stat_weapon_up_a, stat_weapon_up_b]] = entry;
    const note_augment: Augment = makeAugmentNote(
      `Ael Note ${suffix}`,
      0,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_BP]: 4,
          [stat_weapon_up_a]: WEAPON_UP,
          [stat_weapon_up_b]: WEAPON_UP,
        });
      },
      [stat_weapon_up_a, stat_weapon_up_b],
    );
    G_NOTE.push(note_augment);
  }
})();

// combat
// magnus | lab | resola
(() => {
  const DATA_ENTRY: [string, StatEnum][] = [
    ["Magnus", StatEnum.WEAPON_MELEE],
    ["Lab", StatEnum.WEAPON_RANGED],
    ["Resola", StatEnum.WEAPON_TECHNIQUE],
  ];

  const WEAPON_UP: number = 1.015;

  for (const entry of DATA_ENTRY) {
    const [name, stat_weapon_up] = entry;

    const note_augment: Augment = makeAugmentNote(
      `${name} Note`,
      0,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_BP]: 5,
          [stat_weapon_up]: WEAPON_UP,
        });
      },
      [StatEnum.CORE_BP],
    );
    G_NOTE.push(note_augment);
  }
})();

// --------------------------------------
// ret
// exploration
// a | b | c | d
// a
G_NOTE.push(
  makeAugmentNote(
    "Ret Note A",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 10,
      });
    },
    [StatEnum.CORE_HP],
  ),
);
(() => {
  // b | c | d
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["B", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["C", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
    ["D", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
  ];
  const WEAPON_UP: number = 1.0075;
  const HP_UP: number = 5;
  for (const entry of DATA_ENTRY) {
    const [suffix, [stat_weapon_up_a, stat_weapon_up_b]] = entry;
    const note_augment: Augment = makeAugmentNote(
      `Ret Note ${suffix}`,
      0,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_BP]: 4,
          [StatEnum.CORE_HP]: HP_UP,
          [stat_weapon_up_a]: WEAPON_UP,
          [stat_weapon_up_b]: WEAPON_UP,
        });
      },
      [StatEnum.CORE_HP, stat_weapon_up_a, stat_weapon_up_b],
    );
    G_NOTE.push(note_augment);
  }
})();

// combat
// alno
G_NOTE.push(
  makeAugmentNote(
    `Alno Note`,
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 10,
        [StatEnum.CORE_PP]: 3,
        [StatEnum.ADV_OFF_FLOOR]: 1.02,
      });
    },
    [StatEnum.CORE_HP, StatEnum.CORE_PP, StatEnum.ADV_OFF_FLOOR],
  ),
);
// maqea
G_NOTE.push(
  makeAugmentNote(
    `Maqea Note`,
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.WEAPON_MELEE]: 1.0125,
        [StatEnum.WEAPON_RANGED]: 1.0125,
        [StatEnum.WEAPON_TECHNIQUE]: 1.0125,
      });
    },
    [
      StatEnum.WEAPON_MELEE,
      StatEnum.WEAPON_RANGED,
      StatEnum.WEAPON_TECHNIQUE,
    ],
  ),
);

// --------------------------------------
// kvar
// exploration
// a | b | c | d
// a
G_NOTE.push(
  makeAugmentNote(
    "Kvar Note A",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 10,
        [StatEnum.CORE_PP]: 5,
      });
    },
    [StatEnum.CORE_HP, StatEnum.CORE_PP],
  ),
);
(() => {
  // b | c | d
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["B", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["C", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
    ["D", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
  ];
  const WEAPON_UP: number = 1.02;
  for (const entry of DATA_ENTRY) {
    const [suffix, [stat_weapon_up_a, stat_weapon_up_b]] = entry;
    const note_augment: Augment = makeAugmentNote(
      `Kvar Note ${suffix}`,
      0,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_BP]: 4,
          [stat_weapon_up_a]: WEAPON_UP,
          [stat_weapon_up_b]: WEAPON_UP,
          [StatEnum.ADV_DEF_DAMAGE_RES]: 0.98,
        });
      },
      [
        stat_weapon_up_a,
        stat_weapon_up_b,
        StatEnum.ADV_DEF_DAMAGE_RES,
      ],
    );
    G_NOTE.push(note_augment);
  }
})();

// combat
// lostral
G_NOTE.push(
  makeAugmentNote(
    "Lostral Note",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 10,
        [StatEnum.WEAPON_MELEE]: 1.025,
        [StatEnum.WEAPON_RANGED]: 1.025,
        [StatEnum.WEAPON_TECHNIQUE]: 1.025,
      });
    },
    [
      StatEnum.CORE_HP,
      StatEnum.WEAPON_MELEE,
      StatEnum.WEAPON_RANGED,
      StatEnum.WEAPON_TECHNIQUE,
    ],
  ),
);
// belgan
G_NOTE.push(
  makeAugmentNote(
    "Belgan Note",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_PP]: 3,
        [StatEnum.WEAPON_MELEE]: 1.025,
        [StatEnum.WEAPON_RANGED]: 1.025,
        [StatEnum.WEAPON_TECHNIQUE]: 1.025,
      });
    },
    [
      StatEnum.CORE_PP,
      StatEnum.WEAPON_MELEE,
      StatEnum.WEAPON_RANGED,
      StatEnum.WEAPON_TECHNIQUE,
    ],
  ),
);

// --------------------------------------
// stia
// exploration
// a | b | c | d
// a
G_NOTE.push(
  makeAugmentNote(
    "Stia Note A",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 15,
        [StatEnum.CORE_PP]: 5,
      });
    },
    [StatEnum.CORE_HP, StatEnum.CORE_PP],
  ),
);
(() => {
  // b | c | d
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["B", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["C", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
    ["D", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
  ];
  const WEAPON_UP: number = 1.02;
  for (const entry of DATA_ENTRY) {
    const [suffix, [weapon_up_a, weapon_up_b]] = entry;
    const note_augment: Augment = makeAugmentNote(
      `Stia Note ${suffix}`,
      0,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_BP]: 4,
          [weapon_up_a]: WEAPON_UP,
          [weapon_up_b]: WEAPON_UP,
          [StatEnum.AIL_BLIND]: 1.1,
          [StatEnum.AIL_BURN]: 1.1,
          [StatEnum.AIL_FREEZE]: 1.1,
          [StatEnum.AIL_PANIC]: 1.1,
          [StatEnum.AIL_DOWN]: 1.1,
          [StatEnum.AIL_POISON]: 1.1,
          [StatEnum.AIL_SHOCK]: 1.1,
        });
      },
      [
        weapon_up_a,
        weapon_up_b,
        StatEnum.AIL_BLIND,
        StatEnum.AIL_BURN,
        StatEnum.AIL_FREEZE,
        StatEnum.AIL_PANIC,
        StatEnum.AIL_DOWN,
        StatEnum.AIL_POISON,
        StatEnum.AIL_SHOCK,
      ],
    );
    G_NOTE.push(note_augment);
  }
})();

// combat
// dext
G_NOTE.push(
  makeAugmentNote(
    "Dexta Note",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_HP]: 10,
        [StatEnum.WEAPON_MELEE]: 1.02,
        [StatEnum.WEAPON_RANGED]: 1.02,
        [StatEnum.WEAPON_TECHNIQUE]: 1.02,
        [StatEnum.AIL_BLIND]: 0.9,
        [StatEnum.AIL_BURN]: 0.9,
        [StatEnum.AIL_FREEZE]: 0.9,
        [StatEnum.AIL_PANIC]: 0.9,
        [StatEnum.AIL_DOWN]: 0.9,
        [StatEnum.AIL_POISON]: 0.9,
        [StatEnum.AIL_SHOCK]: 0.9,
      });
    },
    [
      StatEnum.CORE_HP,
      StatEnum.WEAPON_MELEE,
      StatEnum.WEAPON_RANGED,
      StatEnum.WEAPON_TECHNIQUE,
      StatEnum.AIL_BLIND,
      StatEnum.AIL_BURN,
      StatEnum.AIL_FREEZE,
      StatEnum.AIL_PANIC,
      StatEnum.AIL_DOWN,
      StatEnum.AIL_POISON,
      StatEnum.AIL_SHOCK,
    ],
  ),
);

// Noizel
G_NOTE.push(
  makeAugmentNote(
    "Noizel Note",
    0,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_BP]: 5,
        [StatEnum.CORE_PP]: 3,
        [StatEnum.WEAPON_MELEE]: 1.02,
        [StatEnum.WEAPON_RANGED]: 1.02,
        [StatEnum.WEAPON_TECHNIQUE]: 1.02,
        [StatEnum.AIL_BLIND]: 0.9,
        [StatEnum.AIL_BURN]: 0.9,
        [StatEnum.AIL_FREEZE]: 0.9,
        [StatEnum.AIL_PANIC]: 0.9,
        [StatEnum.AIL_DOWN]: 0.9,
        [StatEnum.AIL_POISON]: 0.9,
        [StatEnum.AIL_SHOCK]: 0.9,
      });
    },
    [
      StatEnum.CORE_PP,
      StatEnum.WEAPON_MELEE,
      StatEnum.WEAPON_RANGED,
      StatEnum.WEAPON_TECHNIQUE,
      StatEnum.AIL_BLIND,
      StatEnum.AIL_BURN,
      StatEnum.AIL_FREEZE,
      StatEnum.AIL_PANIC,
      StatEnum.AIL_DOWN,
      StatEnum.AIL_POISON,
      StatEnum.AIL_SHOCK,
    ],
  ),
);
