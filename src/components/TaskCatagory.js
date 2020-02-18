import React from "react";
import { ListItem, ListItemIcon, Icon, ListItemText } from "@material-ui/core";

export default function TaskCatagory(props) {
  return (
    <div>
      <div>
        <ListItem>
          <ListItemIcon>
            <Icon fontSize="large" color={props.iconColor}>
              assignment_turned_in
            </Icon>
          </ListItemIcon>
          <ListItemText
            primary={props.catagoryTitle}
            primaryTypographyProps={{ variant: "h6" }}
          />
        </ListItem>
      </div>
    </div>
  );
}
