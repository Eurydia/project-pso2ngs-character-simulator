import { useState } from "react";
import { Food } from "../../assets";
import {
  retrieveData,
  saveData,
  sortAlphabetAscending,
} from "./helper";

const FOOD_ITEM_MAX = 10;

export const useFood = (
  storage_key: string,
): [
  Food[],
  (item: Food, index: number) => void,
  (index: number) => void,
] => {
  const [value, _setValue] = useState<Food[]>(() => {
    return retrieveData(storage_key);
  });

  const addItem = (next_value: Food, index: number) => {
    if (index < 0 || FOOD_ITEM_MAX <= index) {
      return;
    }

    _setValue((prev) => {
      const next = [...prev];
      next[index] = next_value;

      next.sort((a, b) => {
        return sortAlphabetAscending(a.label, b.label);
      });

      saveData(storage_key, next);

      return next;
    });
  };

  const removeItem = (index: number): void => {
    if (index < 0 || FOOD_ITEM_MAX <= index) {
      return;
    }

    _setValue((prev) => {
      const next = [...prev];
      next.splice(index, 1);

      next.sort((a, b) => {
        return sortAlphabetAscending(a.label, b.label);
      });

      saveData(storage_key, next);

      return next;
    });
  };

  return [value, addItem, removeItem];
};