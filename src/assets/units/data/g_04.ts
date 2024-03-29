import { ActionContext } from "../../ContextAction";
import { StatEnum, StatObject, statObject } from "../../stat";

import { GroupEnumUnitRarity } from "../groupEnum";
import { unit, Unit } from "../unit";

export const G_FOUR: Unit[] = [];

const GROWTH_DATA: [number, number][] = [
  [10, 10],
  [20, 20],
  [30, 30],
  [40, 41],
  [50, 51],
  [60, 71],
];

const makeUnitFour = (
  name: string,
  base_defense: number,
  level_required: number,
  getAwareStatObject: (ctx: ActionContext) => StatObject,
): Unit => {
  return unit(
    name,
    GroupEnumUnitRarity.R_FOUR,
    base_defense,
    60,
    level_required,
    GROWTH_DATA,
    getAwareStatObject,
  );
};

// -------------------------
G_FOUR.push(
  makeUnitFour(
    "Qual De Armor",
    8,
    10,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_PP]: 6,
      });
    },
  ),
);

(() => {
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["Arga", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["Belta", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
    ["Sheza", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
  ];
  for (const entry of DATA_ENTRY) {
    const [suffix, [stat_weapon_up_a, stat_weapon_up_b]] = entry;
    const unit_four: Unit = makeUnitFour(
      `Qual De Armor ${suffix}`,
      13,
      12,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_PP]: 4,
          [stat_weapon_up_a]: 1.01,
          [stat_weapon_up_b]: 1.01,
        });
      },
    );
    G_FOUR.push(unit_four);
  }
})();

G_FOUR.push(
  makeUnitFour(
    "Cattleya Armor",
    12,
    10,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_HP]: 20,
        [StatEnum.CORE_PP]: 2,
      });
    },
  ),
);

G_FOUR.push(
  makeUnitFour(
    "Vialto Armor",
    14,
    10,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_HP]: 30,
        [StatEnum.ADV_DEF_DAMAGE_RES]: 1.01,
      });
    },
  ),
);

(() => {
  const DATA_ENTRY: [string, [StatEnum, StatEnum]][] = [
    ["Arga", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["Belta", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
    ["Sheza", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
  ];
  for (const entry of DATA_ENTRY) {
    const [suffix, [stat_weapon_up_a, stat_weapon_up_b]] = entry;
    const unit_four: Unit = makeUnitFour(
      `Vialto Armor ${suffix}`,
      16,
      12,
      (_: ActionContext): StatObject => {
        return statObject({
          [StatEnum.CORE_HP]: 25,
          [stat_weapon_up_a]: 1.005,
          [stat_weapon_up_b]: 1.005,
          [StatEnum.ADV_DEF_DAMAGE_RES]: 1.01,
        });
      },
    );
    G_FOUR.push(unit_four);
  }
})();

G_FOUR.push(
  makeUnitFour(
    "Geant Armor",
    15,
    15,
    (_: ActionContext): StatObject => {
      return statObject({
        [StatEnum.CORE_HP]: -20,
        [StatEnum.CORE_PP]: 10,
        [StatEnum.WEAPON_MELEE]: 1.02,
        [StatEnum.WEAPON_RANGED]: 1.02,
        [StatEnum.WEAPON_TECHNIQUE]: 1.02,
        [StatEnum.AIL_BLIND]: 0.5,
        [StatEnum.AIL_BURN]: 0.5,
        [StatEnum.AIL_FREEZE]: 0.5,
        [StatEnum.AIL_PANIC]: 0.5,
        [StatEnum.AIL_PANIC]: 0.5,
        [StatEnum.AIL_DOWN]: 0.5,
        [StatEnum.AIL_POISON]: 0.5,
        [StatEnum.AIL_SHOCK]: 0.5,
      });
    },
  ),
);
