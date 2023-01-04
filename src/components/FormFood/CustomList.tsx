import { FC } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { CopyAll, Delete } from "@mui/icons-material";

import { Food } from "../../assets";

type CustomListItemProps = {
  label: string;
  onCopy: () => void;
  onRemove: () => void;
};
export const CustomListItem: FC<CustomListItemProps> = (props) => {
  const { label } = props;

  return (
    <ListItem>
      <ListItemText inset primary={label} />
      <ListItemSecondaryAction>
        <IconButton onClick={props.onCopy}>
          <CopyAll />
        </IconButton>
        <IconButton onClick={props.onRemove}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

type CustomListProps = {
  items: Food[];
  onCopy: (index: number, item: Food) => void;
  onRemove: (index: number) => void;
};
export const CustomList: FC<CustomListProps> = (props) => {
  const { items, onCopy, onRemove } = props;

  return (
    <List>
      <ListSubheader disableGutters>
        <Typography>{`${items.length}/10 items used`}</Typography>
      </ListSubheader>
      {items.map((item, index) => {
        return (
          <CustomListItem
            key={`${item.label}-${index}`}
            label={item.label}
            onCopy={() => onCopy(index, item)}
            onRemove={() => onRemove(index)}
          />
        );
      })}
    </List>
  );
};
