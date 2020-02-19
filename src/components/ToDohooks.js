import React, { useState, useEffect } from "react";
import { Grid, Icon, Fab, Container } from "@material-ui/core";
import Navbar from "./Navbar";
import TaskDialog from "./TaskDialog";
import axios from "axios";
import TaskCatagory from "./TaskCatagory";
import TaskList from "./TaskList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  GridSpace: { paddingTop: 100, paddingLeft: 10 }
});
export default function ToDohooks(props) {
  const [taskList, setTaskList] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const classes=useStyles()

  const url = "http://127.0.0.1:5000/task";

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(url);
      setTaskList(response.data.task);
    }
    fetchData();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const handleOnchange = async item => {
    let temp = [...taskList];
    let data = {};

    if (!item.status) {
      data = { id: item.id, status: !item.status, completedAt: new Date() };
      let i = temp.indexOf(item);
      temp[i].completedAt = new Date();
    } else data = { id: item.id, status: !item.status, completedAt: "" };

    await axios.put(url, data);

    let i = temp.indexOf(item);
    temp[i].status = !temp[i].status;
    setTaskList(temp);
  };

  const handleTaskDialog = () => {
    setopenDialog(true);
  };

  const handleClose = () => {
    setopenDialog(false);
  };

  const handleSave = async task => {
    let response = await axios.post(url, task);

    response.status === 201 &&
      setTaskList(tl => [{ ...task, id: response.data.id }, ...tl]);

    handleClose();
  };

  const handleDelete = async task_id => {
    await axios.delete(url, { params: { id: task_id } });

    setTaskList(tl => tl.filter(c => c.id !== task_id));
  };

/* -------------------------------------------------------------------------- */
/*                                   render                                   */
/* -------------------------------------------------------------------------- */

  return (
    <React.Fragment>
      <Container>
        <Navbar />

        <Grid className={classes.GridSpace} container spacing={8}>
          <Grid item sm={6}>
            <TaskCatagory catagoryTitle="Pending Tasks" iconColor="primary" />
            <TaskList
              handleDelete={handleDelete}
              iconColor="primary"
              taskList={taskList.filter(c => !c.status)}
              checkBoxChecked={false}
              handleOnchange={handleOnchange}
            />
          </Grid>

          <Grid item sm={6}>
            <TaskCatagory
              catagoryTitle="Completed Tasks"
              iconColor="secondary"
            />
            <TaskList
              handleDelete={handleDelete}
              iconColor="action"
              taskList={taskList.filter(c => c.status)}
              checkBoxChecked={true}
              handleOnchange={handleOnchange}
            />
          </Grid>
        </Grid>

        <div style={{ position: "absolute", bottom: 100, right: 60 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleTaskDialog}
            size="large"
          >
            <Icon>add</Icon>
          </Fab>
        </div>

        <TaskDialog
          open={openDialog}
          onClose={handleClose}
          onSave={handleSave}
        />
      </Container>
    </React.Fragment>
  );
}
