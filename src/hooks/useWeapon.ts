import { useState, useEffect } from "react";

import { Weapon } from "../assets";

import { isValidJSON } from "./utility";

const retrieveWeapon = (storage_key: string): Weapon | null => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);
  if (loaded_string === null) {
    return null;
  }
  if (!isValidJSON(loaded_string)) {
    return null;
  }
  const label: string | null = JSON.parse(loaded_string);
  if (label === null) {
    return null;
  }
  return Weapon.fromLabel(label);
};

export const retrievePotentialLevel = (
  storage_key: string,
): number => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);
  if (loaded_string === null) {
    return 0;
  }
  if (!isValidJSON(loaded_string)) {
    return 0;
  }
  const parsed_string: number = Number.parseInt(loaded_string);
  if (Number.isNaN(parsed_string)) {
    return 0;
  }
  return parsed_string;
};

export const useWeapon = (
  storage_key_weapon: string,
  storage_key_potential_level: string,
): [
  Weapon | null,
  number,
  (new_value: Weapon | null) => void,
  (new_level: number) => void,
] => {
  const [weapon, setWeapon] = useState(() => {
    return retrieveWeapon(storage_key_weapon);
  });
  const [potentialLevel, setPotentialLevel] = useState(() => {
    return retrievePotentialLevel(storage_key_potential_level);
  });

  useEffect(() => {
    const data_string: string | null = Weapon.toString(weapon);
    localStorage.setItem(
      storage_key_weapon,
      JSON.stringify(data_string),
    );
  }, [weapon]);

  useEffect(() => {
    localStorage.setItem(
      storage_key_potential_level,
      JSON.stringify(potentialLevel),
    );
  }, [potentialLevel]);

  const setterWeapon = (new_value: Weapon | null) => {
    setWeapon(new_value);
    setterPotentialLevel(0);
  };

  const setterPotentialLevel = (new_level: number) => {
    setPotentialLevel(new_level);
  };

  return [weapon, potentialLevel, setterWeapon, setterPotentialLevel];
};