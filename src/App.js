import React, { Component } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon,
  withStyles,
  ListItemIcon,
  Checkbox,
  Fab
} from "@material-ui/core";
import Navbar from "./components/navbar";
import { getTask } from "./utils/tasklist";
import TaskDialog from "./components/TaskDialog";
import TimeAgo from "react-timeago";

const styles = {
  GridSpace: { marginTop: 100, marginLeft: 10 },
  divSpace: { marginLeft: 50 }
};

class App extends Component {
  state = {
    taskList: [],
    openDialog: false,
  };
  handleOnchange = item => {
    // console.log(item.id);
    const temp = [...this.state.taskList];
    const updatedList = temp.map((element, index) => {
      if (element.id === item.id) {
        if (!element.status){
          element.completedAt= new Date()
        }
        element.status = !element.status;
      }
      return element;
    });

    this.setState(updatedList);
  };
  handleTaskDialog = () => {
    this.setState({ openDialog: true });
    // console.log(this.state);
  };
  handleClose = () => {
    console.log(this.state);

    this.setState({ openDialog: false });
  };
  handleSave = task => {
    this.setState(st => {
      st.taskList.unshift(task);
      st.openDialog = false;
      return st;
    });
  };
  render() {
    const { classes } = this.props;
    const { taskList } = this.state;
    // console.log(this.state.taskList);
    return (
      <React.Fragment>
        <Navbar />
        <Grid className={classes.GridSpace} container spacing={8}>
          <Grid container item sm={6}>
            <Grid item sm={12}>
              <div>
                <Icon color="inherit" fontSize="large">
                  assignment_ind
                </Icon>
                <Typography variant="h6">Pending Task</Typography>
              </div>
              <div>
                <List>
                  {taskList
                    .filter(c => !c.status)
                    .map((item, index) => (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <Checkbox
                            onChange={() => this.handleOnchange(item)}
                          />
                        </ListItemIcon>
                        <ListItemAvatar>
                          <Avatar>
                            <Icon color="primary"> assignment </Icon>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.task}
                          secondary={<TimeAgo date={item.createdAt} minPeriod={30} />}
                        />
                      </ListItem>
                    ))}
                </List>
              </div>
            </Grid>
            <Grid item sm={12}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={this.handleTaskDialog}
              >
                <Icon>add</Icon>
              </Fab>
              <TaskDialog
                open={this.state.openDialog}
                onClose={this.handleClose}
                onSave={this.handleSave}
              />
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Icon fontSize="large" color="secondary">
              assignment_turned_in
            </Icon>
            <Typography variant="h6">Completed Task</Typography>

            <List>
              {taskList
                .filter(c => c.status)
                .map((item, index) => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      <Checkbox
                        color="default"
                        checked={item.status}
                        onChange={() => this.handleOnchange(item)}
                      />
                    </ListItemIcon>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon color="disabled"> assignment </Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.task}secondary={<TimeAgo date={item.completedAt} minPeriod={30} />}/>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);
