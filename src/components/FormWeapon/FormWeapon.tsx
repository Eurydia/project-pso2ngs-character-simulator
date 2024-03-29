import { Fragment, FC, useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { BarChartRounded } from "@mui/icons-material";

import {
  Augment,
  Fixa,
  GroupEnumFixa,
  StatObject,
  Weapon,
} from "../../assets";
import { DataWeapon } from "../../types";

import { FormBase } from "../FormBase";
import { AutocompleteWeapon } from "../AutocompleteWeapon";
import { AutocompletePotential } from "../AutocompletePotential";
import { FieldNumber } from "../FieldNumber";
import { AutocompleteFixa } from "../AutocompleteFixa";
import { AutocompleteAugment } from "../AutocompleteAugment";
import { IconButtonTooltip } from "../IconButtonTooltip";
import { StatView } from "../StatView";

type FormWeaponProps = {
  // Dynamic props
  formData: DataWeapon;
  stat: StatObject;
  charLevel: number;

  onWeaponChange: (next_weapon: Weapon | null) => void;
  onPotentialLevelChange: (next_level: number) => void;
  onEnhancementChange: (next_enhancement: number) => void;
  onFixaChange: (next_fixa: Fixa | null) => void;
  onAugmentChange: (
    next_augment: Augment | null,
    augment_index: number,
  ) => void;
};
export const FormWeapon: FC<FormWeaponProps> = (props) => {
  const {
    stat,
    charLevel,
    formData,
    onWeaponChange,
    onPotentialLevelChange,
    onEnhancementChange,
    onFixaChange,
    onAugmentChange,
  } = props;

  const { weapon, potential_level, enhancement, fixa, augments } =
    formData;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const active_slots = useMemo((): number => {
    if (weapon === null) {
      return 0;
    }
    return Augment.getActiveSlots(enhancement);
  }, [weapon, enhancement]);

  return (
    <Fragment>
      <FormBase
        cardTitle="Weapon"
        slotCardHeaderAvatar={null}
        slotCardHeaderAction={
          <IconButtonTooltip
            tooltipText="Open summary"
            icon={<BarChartRounded />}
            onClick={handleDialogOpen}
          />
        }
        slotCardContent={
          <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
            <Grid item xs={1}>
              <Stack spacing={1}>
                <AutocompleteWeapon
                  charLevel={charLevel}
                  weapon={weapon}
                  onWeaponChange={onWeaponChange}
                />
                <AutocompletePotential
                  weapon={weapon}
                  potentialLevel={potential_level}
                  onLevelChange={onPotentialLevelChange}
                />
                <FieldNumber
                  startAdornment={<Typography>+</Typography>}
                  valueMin={0}
                  disabled={weapon === null}
                  value={enhancement}
                  valueMax={
                    weapon === null ? 0 : weapon.enhancement_max
                  }
                  onValueChange={onEnhancementChange}
                />
                <AutocompleteFixa
                  mode={GroupEnumFixa.WEAPON}
                  disabled={weapon === null}
                  fixa={fixa}
                  onFixaChange={onFixaChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack spacing={1}>
                {augments.map((augment, augment_index) => {
                  return (
                    <AutocompleteAugment
                      key={`augment-${augment_index}`}
                      disabled={
                        weapon === null ||
                        augment_index >= active_slots
                      }
                      augment={augment}
                      onAugmentChange={(next_augment) => {
                        onAugmentChange(next_augment, augment_index);
                      }}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        }
      />
      <Dialog
        fullWidth
        keepMounted
        maxWidth="xs"
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          <Typography fontWeight="bold" fontSize="x-large">
            Weapon summary
          </Typography>
        </DialogTitle>
        <DialogContent>
          <StatView stat={stat} maxHeight="" />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
