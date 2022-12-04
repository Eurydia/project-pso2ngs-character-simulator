import { StatEnum } from "../../stat";
import augment, { Augment } from "../augment";
import GroupEnum from "../groupEnum";

const data: Augment[] = [];

const makeAugmentBasic = (
  name: string,
  level: number,
  stats: Partial<{ [K in StatEnum]: number }>,
) => {
  return augment(
    name,
    level,
    GroupEnum.BASIC,
    [GroupEnum.FUSED],
    stats,
  );
};

// --------------------------------------
// stamina
(() => {
  const data_bp = [3, 4, 5];
  const data_hp = [5, 10, 15];

  for (
    let level_index = 0;
    level_index < data_bp.length;
    level_index++
  ) {
    data.push(
      makeAugmentBasic("Stamina", level_index + 1, {
        [StatEnum.CORE_BP]: data_bp[level_index],
        [StatEnum.CORE_HP]: data_hp[level_index],
      }),
    );
  }
})();

// --------------------------------------
// spirit
(() => {
  const data_bp = [2, 3, 4];
  const data_pp = [3, 4, 5];

  for (
    let level_index = 0;
    level_index < data_bp.length;
    level_index++
  ) {
    data.push(
      makeAugmentBasic("Spirit", level_index + 1, {
        [StatEnum.CORE_BP]: data_bp[level_index],
        [StatEnum.CORE_PP]: data_pp[level_index],
      }),
    );
  }
})();

// --------------------------------------
// might | precision | technique
(() => {
  const data_bp = [4, 5, 6, 7];
  const data_weapon_up = [1.01, 1.015, 1.02, 1.03];

  const data_stats: [string, StatEnum][] = [
    ["Might", StatEnum.WEAPON_MELEE],
    ["Precision", StatEnum.WEAPON_RANGED],
    ["Technique", StatEnum.WEAPON_TECHNIQUE],
  ];

  for (const data_stat of data_stats) {
    const [name, weapon_up] = data_stat;

    for (
      let level_index = 0;
      level_index < data_bp.length;
      level_index++
    ) {
      data.push(
        makeAugmentBasic(name, level_index + 1, {
          [StatEnum.CORE_BP]: data_bp[level_index],
          [weapon_up]: data_weapon_up[level_index],
        }),
      );
    }
  }
})();

// --------------------------------------
// deftness
(() => {
  const data_bp = [3, 4, 5, 6];
  const data_floor = [1.01, 1.015, 1.02, 1.03];

  for (
    let level_inedx = 0;
    level_inedx < data_bp.length;
    level_inedx++
  ) {
    data.push(
      makeAugmentBasic("Deftness", level_inedx + 1, {
        [StatEnum.CORE_BP]: data_bp[level_inedx],
        [StatEnum.ADV_OFF_FLOOR]: data_floor[level_inedx],
      }),
    );
  }
})();

// --------------------------------------
// guard
(() => {
  const data_bp = [2, 3, 4, 5];
  const data_damage_res = [1.01, 1.015, 1.02, 1.03];

  for (
    let level_index = 0;
    level_index < data_bp.length;
    level_index++
  ) {
    data.push(
      makeAugmentBasic("Guard", level_index + 1, {
        [StatEnum.CORE_BP]: data_bp[level_index],
        [StatEnum.ADV_DEF_DAMAGE_RES]: data_damage_res[level_index],
      }),
    );
  }
})();

// --------------------------------------
// mastery
(() => {
  const data_bp = [6, 8, 10, 12];
  const data_weapon_up = [1.01, 1.015, 1.02, 1.025];
  const data_floor = [1.01, 1.015, 1.02, 1.025];
  const data_damage_res = [1.01, 1.015, 1.02, 1.025];

  for (
    let level_index = 0;
    level_index < data_bp.length;
    level_index++
  ) {
    const weapon_up_value = data_weapon_up[level_index];

    data.push(
      makeAugmentBasic("Mastery", level_index + 1, {
        [StatEnum.CORE_BP]: data_bp[level_index],
        [StatEnum.WEAPON_MELEE]: weapon_up_value,
        [StatEnum.WEAPON_RANGED]: weapon_up_value,
        [StatEnum.WEAPON_TECHNIQUE]: weapon_up_value,
        [StatEnum.ADV_OFF_FLOOR]: data_floor[level_index],
        [StatEnum.ADV_DEF_DAMAGE_RES]: data_damage_res[level_index],
      }),
    );
  }
})();

export default data;