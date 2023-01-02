import { StatEnum, statObject } from "../../stat";
import { augment, Augment } from "../augment";
import { GroupEnumAugment } from "../groupEnum";

export const G_WARD: Augment[] = [];

const makeAugmentWard = (
  name: string,
  level: number,
  stat: Partial<{ [K in StatEnum]: number }>,
): Augment => {
  return augment(
    name,
    level,
    GroupEnumAugment.WARD,
    [GroupEnumAugment.WARD],
    (_) => {
      return statObject(stat);
    },
  );
};

// --------------------------------------
// ward
(() => {
  const DATA_BP: number[] = [4, 5, 6];
  const DATA_AIL_RES: number[] = [1.2, 1.25, 1.3];

  const DATA_ENTRY: [string, StatEnum][] = [
    ["Burn", StatEnum.AIL_BURN],
    ["Freeze", StatEnum.AIL_FREEZE],
    ["Shock", StatEnum.AIL_SHOCK],
    ["Blind", StatEnum.AIL_BLIND],
    ["Panic", StatEnum.AIL_PANIC],
    ["Poison", StatEnum.AIL_POISON],
    ["Pain", StatEnum.AIL_DOWN],
  ];

  for (const entry of DATA_ENTRY) {
    const [name, stat_ail_res] = entry;

    DATA_BP.forEach((bp, level_index) => {
      const level: number = level_index + 1;
      const ail_res: number = DATA_AIL_RES[level_index];

      const ward_augment: Augment = makeAugmentWard(
        `${name} Ward`,
        level,
        {
          [StatEnum.CORE_BP]: bp,
          [stat_ail_res]: ail_res,
        },
      );

      G_WARD.push(ward_augment);
    });
  }
})();

// --------------------------------------
// sovereign ward
(() => {
  const DATA_BP: number[] = [6, 8, 10];
  const DATA_AIL_RES: number[] = [1.2, 1.25, 1.3];

  DATA_BP.forEach((bp, level_index) => {
    const level: number = level_index + 1;
    const ail_res: number = DATA_AIL_RES[level_index];

    const ward_augment: Augment = makeAugmentWard(
      "Sovereign Ward",
      level,
      {
        [StatEnum.CORE_BP]: bp,
        [StatEnum.AIL_BURN]: ail_res,
        [StatEnum.AIL_FREEZE]: ail_res,
        [StatEnum.AIL_SHOCK]: ail_res,
        [StatEnum.AIL_BLIND]: ail_res,
        [StatEnum.AIL_PANIC]: ail_res,
        [StatEnum.AIL_POISON]: ail_res,
        [StatEnum.AIL_DOWN]: ail_res,
      },
    );

    G_WARD.push(ward_augment);
  });
})();
