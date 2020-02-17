import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Toolbar variant="regular">
          <IconButton color="inherit">To-Do</IconButton> 
           
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
