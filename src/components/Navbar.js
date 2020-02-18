import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Box
} from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Box display="flex" justifyContent="center">
            <Toolbar variant="regular">
              <ListItem>
                <Box>
                  <ListItemIcon>
                    <Icon fontSize="large" style={{ color: yellow[500] }}>
                      assignment
                    </Icon>
                  </ListItemIcon>
                </Box>
                <Box>
                  <ListItemText
                    primary="To-Do"
                    primaryTypographyProps={{ variant: "h5" }}
                  />
                </Box>
              </ListItem>
            </Toolbar>
          </Box>
        </AppBar>
      </div>
    );
  }
}
