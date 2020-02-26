import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <TextField placeholder="Søk..." autoFocus fullWidth />
      </div>
    );
  }
}
