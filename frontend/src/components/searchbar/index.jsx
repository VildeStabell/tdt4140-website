import React from "react";
import { TextField } from "@material-ui/core";

export default function SearchBar({ getProducts }) {
  return (
    <div>
      <TextField
        placeholder="Søk..."
        autoFocus
        fullWidth
        onChange={e => getProducts(e.target.value)}
      />
    </div>
  );
}
