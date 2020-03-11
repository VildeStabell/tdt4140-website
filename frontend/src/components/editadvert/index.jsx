import React from "react";
import "./style.css";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

export default function EditAdvert() {
  return (
    <Container maxWidth="sm" className="edit-advert">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">Rediger annonse</Typography>
        </Grid>
        <Grid item>
          <TextField fullWidth variant="outlined" label="Tittel"></TextField>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Pris i NOK"
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            rows="8"
            rowsMax="16"
            variant="outlined"
            label="Beskrivelse av salgsgjenstanden"
          ></TextField>
        </Grid>
        <Grid item>
          <input
            className="img-upload"
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              fullWidth
              variant="contained"
              component="span"
              startIcon={<ImageIcon />}
            >
              Last opp bilde
            </Button>
          </label>
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" color="primary" size="large">
            Lagre annonse
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
