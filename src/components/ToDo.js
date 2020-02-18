import React, { Component } from "react";
import { Grid, Icon, withStyles, Fab, Container } from "@material-ui/core";
import Navbar from "./Navbar";
import TaskDialog from "./TaskDialog";
import axios from "axios";
import TaskCatagory from "./TaskCatagory";
import TaskList from "./TaskList";

const styles = {
  GridSpace: { paddingTop: 100, paddingLeft: 10 }
};

class ToDo extends Component {
  state = {
    taskList: [],
    openDialog: false
  };

  url = "http://127.0.0.1:5000/task";
  async componentDidMount() {
    let response = await axios.get(this.url);
    this.setState({ taskList: response.data?.task ?? [] });
  }

  handleOnchange = async item => {
    let temp = [...this.state.taskList];
    let data = {};

    if (!item.status) {
      data = { id: item.id, status: !item.status, completedAt: new Date() };
      let i = temp.indexOf(item);
      temp[i].completedAt = new Date();
    } else data = { id: item.id, status: !item.status, completedAt: "" };

    await axios.put(this.url, data);

    let i = temp.indexOf(item);
    temp[i].status = !temp[i].status;
    this.setState({ taskList: temp });
  };

  handleTaskDialog = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
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

  handleDelete = async task_id => {
    await axios.delete(this.url, { params: { id: task_id } });
    let temp = this.state.taskList.filter(c => c.id !== task_id);
    this.setState({ taskList: temp });
  };

  render() {
    const { classes } = this.props;
    const { taskList } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Navbar />

          <Grid className={classes.GridSpace} container spacing={8}>
            
            <Grid item sm={6}>
              <TaskCatagory catagoryTitle="Pending Tasks" iconColor="primary" />
              <TaskList
                handleDelete={this.handleDelete}
                iconColor="primary"
                taskList={taskList.filter(c => !c.status)}
                checkBoxChecked={false}
                handleOnchange={this.handleOnchange}
              />
            </Grid>

            <Grid item sm={6}>
              <TaskCatagory
                catagoryTitle="Completed Tasks"
                iconColor="secondary"
              />
              <TaskList
                handleDelete={this.handleDelete}
                iconColor="default"
                taskList={taskList.filter(c => c.status)}
                checkBoxChecked={true}
                handleOnchange={this.handleOnchange}
              />
            </Grid>
  
          </Grid>
          
          <div style={{ position: "absolute", bottom: 100, right: 60 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={this.handleTaskDialog}
              size="large"
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
export default withStyles(styles)(ToDo);
