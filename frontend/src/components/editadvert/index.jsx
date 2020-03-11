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

export default function EditAdvert({ accessToken }) {
  return (
    <Container maxWidth="sm" className="edit-advert">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">Rediger annonse</Typography>
        </Grid>
        <Grid item>
          <TextField
            autoComplete="off"
            id="title"
            fullWidth
            variant="outlined"
            label="Tittel"
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            autoComplete="off"
            id="price"
            variant="outlined"
            label="Pris i NOK"
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            autoComplete="off"
            id="description"
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              UpdateAdvert(accessToken);
            }}
          >
            Lagre annonse
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function UpdateAdvert(accessToken) {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.querySelector('input[type="file"]');
  const url = "http://127.0.0.1:8000/api/marketplace/saleItems/";
  var error = false;
  console.log("Token: " + accessToken);

  let form_data = new FormData();
  form_data.append("image", image.files[0]);
  form_data.append("title", title);
  form_data.append("price", price);
  form_data.append("description", description);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      Authorization: "Bearer" + " " + accessToken
    },
    body: form_data
  })
    .then(res => {
      if (res.status >= 400) {
        console.log("Error");
        error = true;
      }
      return res.json();
    })
    .then(res => {
      if (!error) {
        console.log("Success!");
        console.log(res);
      } else {
        console.log(res);
      }
    });
}
