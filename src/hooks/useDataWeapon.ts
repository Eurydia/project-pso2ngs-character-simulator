import { useMemo } from "react";

import { Augment, Fixa, Weapon } from "../assets";
import { DataWeapon } from "../types";

import { useWeapon } from "./useWeapon";
import { useNumber } from "./useNumber";
import { useFixa } from "./useFixa";
import { useAugments } from "./useAugments";

export const useDataWeapon = (
  storage_key: string,
): {
  dataWeapon: DataWeapon;
  setWeapon: (next_weapon: Weapon | null) => void;
  setPotentialLevel: (next_level: number) => void;
  setEnhancement: (next_enhancement: number) => void;
  setFixa: (next_fixa: Fixa | null) => void;
  setAugment: (
    next_augment: Augment | null,
    augment_index: number,
  ) => void;
} => {
  const { weapon, potentialLevel, setWeapon, setPotentialLevel } =
    useWeapon(storage_key);
  const { value: enhancement, setValue: setEnhancement } =
    useNumber(storage_key);
  const { fixa, setFixa } = useFixa(storage_key);
  const { augments, setAugment } = useAugments(storage_key);

  const dataWeapon = useMemo((): DataWeapon => {
    return {
      weapon,
      potential_level: potentialLevel,
      enhancement,
      fixa,
      augments,
    };
  }, [weapon, potentialLevel, enhancement, fixa, augments]);

  return {
    dataWeapon,
    setWeapon,
    setPotentialLevel,
    setEnhancement,
    setFixa,
    setAugment,
  };
};
