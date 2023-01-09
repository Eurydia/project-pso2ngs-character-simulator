import { ActionContext } from "../context";
import { StatObject } from "../stat";

export type AddonSkill = {
  name: string;
  getAwareStatObject: (
    ctx: ActionContext,
    level_index: number,
  ) => StatObject;
};

export const AddonSkill = {
  getStatObject: (
    ctx: ActionContext,
    addon_skill: AddonSkill,
    level: number,
  ) => {
    return addon_skill.getAwareStatObject(ctx, level - 1);
  },
};

export const addonSkill = (
  name: string,
  getAwareStatObject: (
    ctx: ActionContext,
    level_index: number,
  ) => StatObject,
): AddonSkill => {
  const result: AddonSkill = {
    name,
    getAwareStatObject,
  };

  return result;
};