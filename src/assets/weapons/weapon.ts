import { StatObject } from "../../types";
import { StatEnum } from "../stat";
import WeaponGroup from "./groupEnum";

export class Weapon {
  name: string;
  stats: StatObject;
  group: WeaponGroup;

  #growth_rate: [number, number][];

  constructor(
    name: string,
    group: WeaponGroup,
    stats: StatObject,
    growth_rate: [number, number][],
  ) {
    this.name = name;
    this.group = group;
    this.stats = stats;

    this.#growth_rate = growth_rate;
  }

  get label(): string {
    return this.name;
  }

  get base_attack(): number {
    const _base_attack: number | undefined =
      this.stats[StatEnum.CORE_ATTACK];

    if (_base_attack === undefined) {
      return 0;
    }
    return _base_attack;
  }
  // get bp(): number {}

  // getAttack(level: number): number {
  //   return this.#attackGetter(this.base_attack, level);
  // }
}

const weapon = (
  name: string,
  group: WeaponGroup,
  growth_rate: [number, number][],
  stats: StatObject,
): Weapon => {
  return new Weapon(name, group, stats, growth_rate);
};

export default weapon;
