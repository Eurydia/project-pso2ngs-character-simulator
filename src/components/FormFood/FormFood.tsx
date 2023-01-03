import { FC, useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  List,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import { ActionContext, Food, StatObject } from "../../assets";
import { useFood } from "../../hooks";
import { SummaryFood } from "../../types";

import { AutocompleteFood } from "../AutocompleteFood";

import { CustomItem } from "./CustomItem";
import { createStat, createSummary } from "./helper";

const CONTEXT: ActionContext = {};

type FormFoodProps = {
  storage_key: string;
  onStatChange: (stat: StatObject) => void;
  onSummaryChange: (summaries: SummaryFood[]) => void;
};
export const FormFood: FC<FormFoodProps> = (props) => {
  const { onStatChange, onSummaryChange, storage_key } = props;

  const [items, addItem, removeItem] = useFood(storage_key);
  const [selected, setSelected] = useState<Food | null>(null);

  const handleAdd = () => {
    if (selected === null) {
      return;
    }
    addItem(0, selected);
    setSelected(null);
  };

  const handleCopy = (index: number, item: Food) => {
    addItem(index, item);
  };

  const handleRemove = (index: number) => {
    removeItem(index);
  };

  const stat = useMemo((): StatObject => {
    return createStat(CONTEXT, items);
  }, [items]);

  const summaries = useMemo((): SummaryFood[] => {
    return createSummary(items);
  }, [items]);

  useEffect(() => {
    onSummaryChange(summaries);
  }, [summaries]);

  useEffect(() => {
    onStatChange(stat);
  }, [stat]);

  return (
    <Box>
      <Stack spacing={2}>
        <Button
          disableRipple
          disabled={selected === null}
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{ display: "inline" }}
        >
          add
        </Button>
        <AutocompleteFood
          value={selected}
          onChange={setSelected}
          onEnterPress={handleAdd}
        />
        <List disablePadding>
          <ListSubheader disableSticky>
            <Typography>{`${items.length}/10 items used`}</Typography>
          </ListSubheader>
          {items.map((item, index) => {
            return (
              <CustomItem
                key={`${item.label}-${index}`}
                item={item}
                onCopy={() => handleCopy(index, item)}
                onRemove={() => handleRemove(index)}
              />
            );
          })}
        </List>
      </Stack>
    </Box>
  );
};
