import { StatEnum } from "../../stat";
import augment, { Augment } from "../augment";
import GroupEnum from "../groupEnum";

const data: Augment[] = [];

const makeAugmentDualble = (
  name: string,
  level: number,
  stats: Partial<{ [K in StatEnum]: number }>,
): Augment => {
  return augment(
    name,
    level,
    GroupEnum.DUALBLE,
    [GroupEnum.DUALBLE],
    stats,
  );
};

// --------------------------------------
// melra | meltech | ratech
(() => {
  const data_bp = [4, 5, 6];
  const data_weapon_up = [1.0075, 1.0125, 1.0175];

  const data_stats: [string, [StatEnum, StatEnum]][] = [
    ["melra", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_RANGED]],
    ["meltech", [StatEnum.WEAPON_MELEE, StatEnum.WEAPON_TECHNIQUE]],
    ["ratech", [StatEnum.WEAPON_RANGED, StatEnum.WEAPON_TECHNIQUE]],
  ];

  for (const data_stat of data_stats) {
    const [name, [weapon_up_a, weapon_up_b]] = data_stat;

    for (
      let level_index = 0;
      level_index < data_bp.length;
      level_index++
    ) {
      const weapon_up_value = data_weapon_up[level_index];

      data.push(
        makeAugmentDualble(`${name} dualble`, level_index + 1, {
          [StatEnum.CORE_BP]: data_bp[level_index],
          [weapon_up_a]: weapon_up_value,
          [weapon_up_b]: weapon_up_value,
        }),
      );
    }
  }
})();

// --------------------------------------
// triplble
data.push(
  makeAugmentDualble("triplble", 0, {
    [StatEnum.CORE_BP]: 8,
    [StatEnum.WEAPON_MELEE]: 1.02,
    [StatEnum.WEAPON_RANGED]: 1.02,
    [StatEnum.WEAPON_TECHNIQUE]: 1.02,
  }),
);

export default data;
