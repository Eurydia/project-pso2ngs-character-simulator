import { FilterOptionsState } from "@mui/material";
import { matchSorter } from "match-sorter";

import { Weapon } from "../../assets";

const extractTerms = (value: string): string[] => {
  const items = value.split(" ");
  const terms: string[] = [];
  items.forEach((item) => {
    const item_trimmed = item.trim();
    if (item_trimmed === "") {
      return;
    }
    terms.push(item_trimmed);
  });
  return terms;
};

const termReducer = (options: Weapon[], term: string): Weapon[] => {
  return matchSorter(options, term, {
    keys: [(item) => item.label, (item) => item.rarity],
  });
};

const sieveOptions = (
  options: Weapon[],
  terms: string[],
): Weapon[] => {
  return terms.reduceRight(termReducer, options);
};

export const filterOptions = (
  options: Weapon[],
  state: FilterOptionsState<Weapon>,
  result_size: number = 16,
) => {
  const value: string = state.inputValue;
  const terms: string[] = extractTerms(value);
  const filtered_options: Weapon[] = sieveOptions(
    options,
    terms,
  ).slice(0, result_size);
  return filtered_options;
};
