import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, Fragment } from "react";
import AugmentForm from "../AugmentForm";
import EnhancementField from "../EnhancementField";
import EquipmentFormLayout from "../EquipmentFormLayout";

interface WeaponFormProps {}
const WeaponForm: FC<WeaponFormProps> = () => {
  return (
    <EquipmentFormLayout
      equipmentSlot={<TextField fullWidth label="Weapon" />}
      enhancementSlot={
        <EnhancementField value="0" onChange={() => null} />
      }
      fixaSlot={<TextField fullWidth label="Fixa" />}
      augmentSlot={<AugmentForm />}
    />
  );
};

export default WeaponForm;
