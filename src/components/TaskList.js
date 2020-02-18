import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Button,
  Avatar,
  Icon,
  Checkbox
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import TimeAgo from "react-timeago";

export default class TaskList extends Component {
  render() {
    const {
      taskList,
      handleOnchange,
      handleDelete,
      checkBoxChecked,
      iconColor
    } = this.props;

    return (
      <div>
        <List>
          {taskList.map((item, index) => (
            <ListItem key={item.id} divider>
              <ListItemIcon>
                <Checkbox
                  checked={checkBoxChecked}
                  onChange={() => handleOnchange(item)}
                  color="default"
                />
              </ListItemIcon>

              <ListItemAvatar>
                <Avatar>
                  <Icon color={iconColor}> assignment </Icon>
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={item.task}
                secondary={
                  <TimeAgo
                    date={checkBoxChecked ? item.completedAt : item.createdAt}
                    minPeriod={30}
                  />
                }
              />

              <Button
                variant="contained"
                style={{ backgroundColor: deepOrange[900] }}
                onClick={() => handleDelete(item.id)}
              >
                Clear Task
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
