import React, { Component } from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link component={RouterLink} to={"/"} color="inherit" href="#">
            SellYo'Shit AS
          </Link>{" "}
          2020.
        </Typography>
      </div>
    );
  }
}
