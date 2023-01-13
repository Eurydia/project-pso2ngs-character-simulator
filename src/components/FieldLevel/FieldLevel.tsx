import { FC, ChangeEvent, memo } from "react";
import { TextField } from "@mui/material";

import { clampValue } from "./helper";

type FieldLevelProps = {
  label: string;
  disabled: boolean;
  valueMin: number;
  valueMax: number;
  value: number;
  onValueChange: (next_level: number) => void;
};
export const FieldLevel: FC<FieldLevelProps> = memo(
  (props) => {
    const {
      label,
      disabled,
      value,
      valueMax,
      valueMin,
      onValueChange,
    } = props;

    const handleValueChange = (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      const value_input: string = event.target.value;
      const value_parsed: number = Number.parseInt(value_input);
      if (Number.isNaN(value_parsed)) {
        onValueChange(0);
        return;
      }
      const value_clamped: number = clampValue(
        value_parsed,
        valueMin,
        valueMax,
      );
      onValueChange(value_clamped);
    };

    let _value: number = 0;
    if (!Number.isNaN(value)) {
      _value = value;
    }

    return (
      <TextField
        fullWidth
        inputMode="numeric"
        placeholder={label}
        disabled={disabled}
        value={_value.toString()}
        onChange={handleValueChange}
        sx={{
          textDecorationLine: props.disabled
            ? "line-through"
            : "none",
        }}
      />
    );
  },
  (prev, next) => {
    return (
      prev.disabled === next.disabled &&
      prev.value === next.value &&
      prev.valueMax === next.valueMax &&
      prev.valueMin === next.valueMin
    );
  },
);
