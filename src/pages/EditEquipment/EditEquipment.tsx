import { FC, useEffect, useMemo } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import { statObject, StatObject } from "../../assets";
import { useSummaryEquipment, useStatObject } from "../../hooks";
import { SummaryEquipment } from "../../types";
import {
  FormWeapon,
  FormUnit,
  FormBase,
  StatView,
} from "../../components";

const SummaryItem: FC<SummaryEquipment> = (props) => {
  const { equipment, fixa, augments } = props;

  return (
    <Box>
      <Typography fontWeight="bold">{equipment}</Typography>
      <Typography>{fixa}</Typography>
      {augments.map((value, index) => (
        <Typography key={`${value}-${index}`}>{value}</Typography>
      ))}
    </Box>
  );
};

type SummaryProps = { items: SummaryEquipment[] };
const Summary: FC<SummaryProps> = (props) => {
  const { items } = props;
  return (
    <Box>
      <Grid container spacing={2} columns={{ sm: 2 }}>
        {items.map((item, index) => {
          if (item.equipment === null) {
            return null;
          }

          return (
            <Grid key={`summary-${index}`} item xs={1}>
              <SummaryItem {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

type EditEquipmentProps = {
  onChange: (stat: StatObject) => void;
};
const EditEquipment: FC<EditEquipmentProps> = (props) => {
  const { onChange } = props;
  const [statWeapon, setStatWeapon] = useStatObject();
  const [statUnitA, setStatUnitA] = useStatObject();
  const [statUnitB, setStatUnitB] = useStatObject();
  const [statUnitC, setStatUnitC] = useStatObject();

  const [summaryWeapon, setSummaryWeapon] = useSummaryEquipment();
  const [summaryUnitA, setSummaryUnitA] = useSummaryEquipment();
  const [summaryUnitB, setSummaryUnitB] = useSummaryEquipment();
  const [summaryUnitC, setSummaryUnitC] = useSummaryEquipment();

  const stat: StatObject = useMemo(() => {
    const result: StatObject = statObject();

    const items: StatObject[] = [
      statWeapon,
      statUnitA,
      statUnitB,
      statUnitC,
    ];

    for (const item of items) {
      result.merge(item);
    }

    return result;
  }, [statWeapon, statUnitA, statUnitB, statUnitC]);

  useEffect(() => {
    onChange(stat);
  }, [stat]);

  const summaries = [
    summaryWeapon,
    summaryUnitA,
    summaryUnitB,
    summaryUnitC,
  ];

  return (
    <Box margin={4}>
      <Stack spacing={2}>
        <FormBase
          title="Summary"
          slotHeaderAction={null}
          slotSecondary={<StatView maxHeight="400px" stat={stat} />}
          slotPrimary={<Summary items={summaries} />}
        />
        <FormWeapon
          storageKey="equipment-weapon"
          cardTitle="Weapon"
          onStatChange={setStatWeapon}
          onSummaryChange={setSummaryWeapon}
        />
        <FormUnit
          storageKey="equipment-unit-a"
          cardTitle="Unit A"
          onStatChange={setStatUnitA}
          onSummaryChange={setSummaryUnitA}
        />
        <FormUnit
          storageKey="equipment-unit-b"
          cardTitle="Unit B"
          onStatChange={setStatUnitB}
          onSummaryChange={setSummaryUnitB}
        />
        <FormUnit
          storageKey="equipment-unit-c"
          cardTitle="Unit C"
          onStatChange={setStatUnitC}
          onSummaryChange={setSummaryUnitC}
        />
      </Stack>
    </Box>
  );
};

export default EditEquipment;
