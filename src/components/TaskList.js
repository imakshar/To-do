import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Icon,
  Checkbox,
  withStyles,
  ListItemSecondaryAction
} from "@material-ui/core";
import TimeAgo from "react-timeago";

const styles= {
  inline: {
    display: 'inline',
  }
}

class TaskList extends Component {

  render() {
    const {
      taskList,
      handleOnchange,
      handleDelete,
      checkBoxChecked,
      iconColor,
      
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
                primary= {<Typography variant="body2" gutterBottom noWrap>{item.task}</Typography>}
                disableTypography
                secondary={
                  <TimeAgo
                    date={checkBoxChecked ? item.completedAt : item.createdAt}
                    minPeriod={30}
                  />
                }
              />
              <ListItemSecondaryAction>

              <IconButton
                variant="contained"
                // style={{ backgroundColor: deepOrange[900] ,color:"secondary"}}
                onClick={() => handleDelete(item.id)}
              >
                <Icon color={iconColor}> delete </Icon>
                
              </IconButton>

              </ListItemSecondaryAction>
             
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);