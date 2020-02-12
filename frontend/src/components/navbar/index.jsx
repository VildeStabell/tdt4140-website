import React, { Component } from "react";
import { Grid, Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import "./style.css";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography
                  component={Link}
                  to={"/"}
                  variant="h4"
                  type="title"
                  color="inherit"
                  style={{ textDecoration: "none" }}
                >
                  SellYo'Shit
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/signIn"
                  variant="contained"
                  startIcon={<PersonIcon />}
                >
                  Logg inn
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
