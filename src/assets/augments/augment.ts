import { ActionContext } from "../ContextAction";
import { statObject, StatObject } from "../stat";

import { GroupEnumAugment } from "./groupEnum";

const AUGMENT_LOOKUP: { [key: string]: Augment } = {};

const ROMAN_LOOKUP: { [key: number]: string } = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
};
const toRoman = (num: number): string => {
  if (num < 1) {
    return "";
  }
  return ROMAN_LOOKUP[num];
};

export type Augment = Readonly<{
  name: string;
  level: string;
  level_roman: string;
  label: string;
  group: GroupEnumAugment;
  conflict: GroupEnumAugment[];
  getAwareStatObject: (ctx: ActionContext) => StatObject;
  searchable_terms: string[];
}>;

export const Augment = {
  create: (
    name: string,
    augment_level: number,
    group: GroupEnumAugment,
    conflict: GroupEnumAugment[],
    getAwareStatObject: (ctx: ActionContext) => StatObject,
    searchable_terms: string[],
  ): Augment => {
    const level = augment_level.toString();
    const level_roman = toRoman(augment_level);
    const label = `${name} ${level_roman}`.trimEnd();

    const augment: Augment = {
      name,
      label,
      level,
      level_roman,
      group,
      conflict,
      getAwareStatObject,
      searchable_terms,
    };

    AUGMENT_LOOKUP[label] = augment;

    return augment;
  },

  toString: (augments: (Augment | null)[]): string => {
    const labels: (string | null)[] = [];
    for (const item of augments) {
      if (item === null) {
        labels.push(null);
        continue;
      }
      labels.push(item.label);
    }
    return JSON.stringify(labels);
  },

  fromLabel: (label: string | null): Augment | null => {
    if (label === null) {
      return null;
    }
    if (label in AUGMENT_LOOKUP) {
      return AUGMENT_LOOKUP[label];
    }
    return null;
  },

  fromLabels: (labels: (string | null)[]): (Augment | null)[] => {
    const results: (Augment | null)[] = [];
    labels.forEach((label) => {
      results.push(Augment.fromLabel(label));
    });
    return results;
  },

  getActiveSlots: (enhancement: number): number => {
    if (enhancement >= 50) {
      return 5;
    }
    if (enhancement >= 40) {
      return 4;
    }
    if (enhancement >= 20) {
      return 3;
    }
    return 2;
  },

  getActiveAugments: (
    augments: (Augment | null)[],
    enhancement: number,
  ): (Augment | null)[] => {
    const active_slots: number = Augment.getActiveSlots(enhancement);
    return augments.slice(0, active_slots);
  },

  getStatObject: (
    ctx: ActionContext,
    augment: Augment | null,
  ): StatObject => {
    if (augment === null) {
      return statObject();
    }
    return augment.getAwareStatObject(ctx);
  },

  removeConflict: (
    augments: (Augment | null)[],
    next_augment_index: number,
  ): (Augment | null)[] => {
    const result: (Augment | null)[] = [...augments];
    const next_augment: Augment | null = augments[next_augment_index];
    if (next_augment === null) {
      return result;
    }
    augments.forEach((prev_item, augment_index) => {
      if (augment_index === next_augment_index) {
        return;
      }
      if (prev_item === null) {
        return;
      }
      if (next_augment.name === prev_item.name) {
        result[augment_index] = null;
        return;
      }
      if (
        next_augment.name === "Mastery" &&
        prev_item.group === GroupEnumAugment.FUSED
      ) {
        return;
      }
      if (
        prev_item.name === "Mastery" &&
        next_augment.group === GroupEnumAugment.FUSED
      ) {
        return;
      }
      if (next_augment.conflict.includes(prev_item.group)) {
        result[augment_index] = null;
        return;
      }
    });
    return result;
  },
};
