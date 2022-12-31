import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Food, StatObject } from "../../assets";
import { useFood } from "../../hooks";

import AutocompleteFood from "../AutocompleteFood";
import CustomItem from "./CustomItem";

type FormFoodProps = {
  storage_key: string;
  onStatChange: (stat: StatObject) => void;
};
const FormFood: FC<FormFoodProps> = (props) => {
  const [items, addItem, removeItem] = useFood(props.storage_key);
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

  return (
    <Box>
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <Button
            disableRipple
            disabled={selected === null}
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            add
          </Button>
          <AutocompleteFood
            value={selected}
            onChange={setSelected}
            onEnterPress={handleAdd}
          />
        </Stack>
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
export default FormFood;
