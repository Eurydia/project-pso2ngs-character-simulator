import { FC, memo, SyntheticEvent, useCallback } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
} from "@mui/material";

import { AssetUnits, Unit } from "../../assets";

import { filterOptions } from "./helper";
import { OptionUnit } from "./OptionUnit";
import { TextFieldUnit } from "./TextFieldUnit";

type AutocompleteUnitProps = {
  // Dynamic props
  charLevel: number;
  unit: Unit | null;

  onUnitChange: (next_unit: Unit | null) => void;
};
export const AutocompleteUnit: FC<AutocompleteUnitProps> = memo(
  (props) => {
    const { charLevel, unit, onUnitChange } = props;

    const handleUnitChange = useCallback(
      (
        event: SyntheticEvent<Element, Event>,
        value: Unit | null,
        reason: AutocompleteChangeReason,
      ): void => {
        onUnitChange(value);
      },
      [],
    );

    return (
      <Autocomplete
        options={AssetUnits}
        value={unit}
        onChange={handleUnitChange}
        filterOptions={filterOptions}
        getOptionDisabled={(option) => {
          return option.level_required > charLevel;
        }}
        renderInput={(params) => {
          return (
            <TextFieldUnit
              {...params}
              shouldShowWarning={unit === null}
            />
          );
        }}
        renderOption={(props, option, _) => {
          return (
            <OptionUnit
              key={option.label}
              LIProps={props}
              option={option}
            />
          );
        }}
      />
    );
  },
  (prev, next) => {
    return (
      prev.charLevel === next.charLevel &&
      prev.unit?.label === next.unit?.label
    );
  },
);
