import React, { Component } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon,
  withStyles,
  ListItemIcon,
  Checkbox,
  Fab,
  Container
} from "@material-ui/core";
import Navbar from "./components/navbar";
import TaskDialog from "./components/TaskDialog";
import TimeAgo from "react-timeago";

import axios from "axios";

const styles = {
  GridSpace: { paddingTop: 100, paddingLeft: 10 }
};

class App extends Component {
  state = {
    taskList: [],
    openDialog: false
  };
  url = "http://127.0.0.1:5000/task";
  async componentDidMount() {
    let response = await axios.get(this.url);
    // console.log(response.data.task);
    this.setState({ taskList: response.data?.task ?? [] });
  }
  handleOnchange = async item => {
    // console.log(item.id);
    let temp = [...this.state.taskList];
    let data = { id: item.id, status: !item.status };

    await axios.put(this.url, data);

    // const updatedList = temp.map((element, index) => {
    //   if (element.id === item.id) {
    //     element.status = !element.status;
    //   }
    //   return element;
    // });
    let i = temp.indexOf(item);
    temp[i].status = !temp[i].status;

    this.setState({ taskList: temp });
  };
  handleTaskDialog = () => {
    this.setState({ openDialog: true });
    // console.log(this.state);
  };
  handleClose = () => {
    console.log(this.state);

    this.setState({ openDialog: false });
  };
  handleSave = async task => {
    let response = await axios.post(this.url, task);

    response.status === 201 &&
      this.setState(st => {
        st.taskList.unshift({ ...task, id: response.data.id });
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
        <Container>
          <Navbar />
          <Grid className={classes.GridSpace} container spacing={8}>
            <Grid container item sm={6}>
              <Grid item sm={12}>
                <div>
                  <ListItem>
                    <ListItemIcon>
                      <Icon fontSize="large" color="primary">
                        assignment_turned_in
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary="Pending Task"
                      primaryTypographyProps={{ variant: "h6" }}
                    />
                  </ListItem>
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
                            secondary={
                              <TimeAgo date={item.createdAt} minPeriod={30} />
                            }
                          />
                        </ListItem>
                      ))}
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <ListItem>
                <ListItemIcon>
                  <Icon fontSize="large" color="secondary">
                    assignment_turned_in
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary="Completed Task"
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItem>

              <List>
                {taskList
                  .filter(c => c.status)
                  .map((item, index) => (
                    <ListItem key={item.id}>
                      <ListItemIcon>
                        <Checkbox
                          color="default"
                          checked={!!item.status}
                          onChange={() => this.handleOnchange(item)}
                        />
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar>
                          <Icon color="disabled"> assignment </Icon>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.task}
                        secondary={
                          <TimeAgo date={item.completedAt} minPeriod={30} />
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
          <div style={{ position: "absolute", bottom: 30, right: 30 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={this.handleTaskDialog}
            >
              <Icon>add</Icon>
            </Fab>
          </div>
          <TaskDialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            onSave={this.handleSave}
          />
        </Container>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);
