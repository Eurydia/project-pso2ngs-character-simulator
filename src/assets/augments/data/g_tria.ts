import { ActionContext } from "../../ContextAction";
import { StatEnum, StatObject, statObject } from "../../stat";
import { Augment } from "../augment";
import { GroupEnumAugment } from "../groupEnum";

export const G_TRIA: Augment[] = [];

const makeAugmentTria = (
  name: string,
  level: number,
  getAwareStatObject: (ctx: ActionContext) => StatObject,
  searchable_terms: string[],
): Augment => {
  return Augment.create(
    name,
    level,
    GroupEnumAugment.TRIA,
    [GroupEnumAugment.TRIA],
    getAwareStatObject,
    searchable_terms,
  );
};

// --------------------------------------
(() => {
  const DATA_ENTRY: [string, StatEnum][] = [
    ["mel", StatEnum.WEAPON_MELEE],
    ["ra", StatEnum.WEAPON_RANGED],
    ["tech", StatEnum.WEAPON_TECHNIQUE],
  ];
  const WEAPON_UP: number = 1.0225;

  for (const entry of DATA_ENTRY) {
    const [name, stat_weapon_up] = entry;
    G_TRIA.push(
      makeAugmentTria(
        `Tria Staro${name}`,
        0,
        (_: ActionContext): StatObject => {
          return statObject({
            [StatEnum.CORE_BP]: 6,
            [StatEnum.CORE_HP]: -5,
            [stat_weapon_up]: WEAPON_UP,
          });
        },
        [StatEnum.CORE_HP, stat_weapon_up],
      ),
    );

    G_TRIA.push(
      makeAugmentTria(
        `Tria Spiro${name}`,
        0,
        (_: ActionContext): StatObject => {
          return statObject({
            [StatEnum.CORE_BP]: 6,
            [StatEnum.CORE_PP]: -3,
            [stat_weapon_up]: WEAPON_UP,
          });
        },
        [StatEnum.CORE_PP, stat_weapon_up],
      ),
    );

    G_TRIA.push(
      makeAugmentTria(
        `Tria Deftro${name}`,
        0,
        (_: ActionContext): StatObject => {
          return statObject({
            [StatEnum.CORE_BP]: 6,
            [stat_weapon_up]: WEAPON_UP,
            [StatEnum.ADV_OFF_FLOOR]: 0.99,
          });
        },
        [stat_weapon_up, StatEnum.ADV_OFF_FLOOR],
      ),
    );

    G_TRIA.push(
      makeAugmentTria(
        `Tria Guaro${name}`,
        0,
        (_: ActionContext): StatObject => {
          return statObject({
            [StatEnum.CORE_BP]: 6,
            [stat_weapon_up]: WEAPON_UP,
            [StatEnum.ADV_DEF_DAMAGE_RES]: 0.99,
          });
        },
        [stat_weapon_up, StatEnum.ADV_DEF_DAMAGE_RES],
      ),
    );
  }
})();
