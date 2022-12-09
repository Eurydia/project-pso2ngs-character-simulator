import { StatEnum } from "../../stat";
import { AssetPotentials, Potential } from "../../potentials";
import GroupEnum from "../groupEnum";
import weapon, { Weapon } from "../weapon";

const data: Weapon[] = [];

const GROWTH_RATE: [number, number][] = [
  [10, 16],
  [20, 33],
  [30, 50],
  [40, 69],
  [50, 143],
  [60, 329],
];

const makeWeaponTwo = (
  name: string,
  potential: Potential,
  stats: Partial<{ [K in StatEnum]: number }>,
): Weapon => {
  return weapon(name, GroupEnum.R_TWO, potential, GROWTH_RATE, stats);
};

// -----------------------
data.push(
  makeWeaponTwo("Tzvia Series", AssetPotentials.INDOMITABLE_UNIT, {
    [StatEnum.CORE_ATTACK]: 195,
    [StatEnum.ADV_OFF_FLOOR]: 1.7,
  }),
);

// -----------------------
data.push(
  makeWeaponTwo("Silver Primm Sword", AssetPotentials.RECYCLER_UNIT, {
    [StatEnum.CORE_ATTACK]: 195,
    [StatEnum.ADV_OFF_FLOOR]: 1.7,
  }),
);

// -----------------------
data.push(
  makeWeaponTwo("N-Exp Weapon", AssetPotentials.RECYCLER_UNIT, {
    [StatEnum.CORE_ATTACK]: 195,
    [StatEnum.ADV_OFF_FLOOR]: 1.7,
  }),
);

export default data;
