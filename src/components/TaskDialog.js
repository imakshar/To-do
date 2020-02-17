import React, { Component } from "react";
import {
  DialogTitle,
  Dialog,
  TextField,
  Grid,
  Button,
  withStyles,
  DialogActions
} from "@material-ui/core";

const styles = {
  GridSpace: { padding: 10 }
};

class TaskDialog extends Component {
  taskInput = React.createRef();
  handleSave = event => {
    event.stopPropagation();
    event.preventDefault();

    let newTask = {
      id: Math.random(),
      task: this.taskInput.current.value,
      status: false,
      createdAt : new Date(),
      completedAt : null 
    };
    this.props.onSave(newTask);
  };

  render() {
    const { open, onClose, classes } = this.props;

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <form onSubmit={this.handleSave}>
          <DialogTitle id="simple-dialog-title" color="primary">
            Add Task Details
          </DialogTitle>
          <Grid container className={classes.GridSpace}>
            <Grid item>
              <TextField
                required
                id="taskInput"
                label="Add Task"
                variant="outlined"
                inputRef={this.taskInput}
                autoFocus
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TaskDialog);
