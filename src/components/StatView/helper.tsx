import { ReactNode } from "react";
import {
  KeyboardDoubleArrowDownRounded,
  KeyboardDoubleArrowUpRounded,
  Remove,
} from "@mui/icons-material";
import { blue, pink } from "@mui/material/colors";

const UP_ICON = (
  <KeyboardDoubleArrowUpRounded htmlColor={blue["400"]} />
);
const DOWN_ICON = (
  <KeyboardDoubleArrowDownRounded htmlColor={pink["400"]} />
);

export const getIcon = (
  value: string | null,
  reversed: boolean = false,
): ReactNode => {
  if (value === null) {
    return null;
  }

  const _value = parseFloat(value);

  let greater_icon = UP_ICON;
  let lesser_icon = DOWN_ICON;

  if (reversed) {
    greater_icon = DOWN_ICON;
    lesser_icon = UP_ICON;
  }

  if (_value > 0) {
    return greater_icon;
  }

  if (_value < 0) {
    return lesser_icon;
  }

  return <Remove />;
};
