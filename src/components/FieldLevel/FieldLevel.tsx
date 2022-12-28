import { FC, ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { toSafeInteger as ld_toSafeInteger } from "lodash";

import { clampValue } from "./helper";

type FieldLevelProps = {
  valueMin: number | null;
  valueMax: number | null;
  value: number;
  onChange: (value: number) => void;
};
const FieldLevel: FC<FieldLevelProps> = (props) => {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value_input: string = event.target.value;
    const value_safe: number = ld_toSafeInteger(value_input);
    const value_clamped: number = clampValue(
      value_safe,
      props.valueMin,
      props.valueMax,
    );

    props.onChange(value_clamped);
  };

  return (
    <TextField
      value={props.value.toString()}
      onChange={handleChange}
      fullWidth
      inputMode="numeric"
      placeholder="Enhancement"
    />
  );
};

export default FieldLevel;