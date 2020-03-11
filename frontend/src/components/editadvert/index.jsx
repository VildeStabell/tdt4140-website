import React from "react";
import "./style.css";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@material-ui/lab";

export default function EditAdvert({ accessToken, userID }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  return (
    <div>
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
                UpdateAdvert(accessToken, setOpenModal, setModalText, userID);
              }}
            >
              Lagre annonse
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openModal}
        autoHideDuration={4000}
        onClose={() => setOpenModal(false)}
      >
        <Alert onClose={() => setOpenModal(false)} severity="error">
          {modalText}
        </Alert>
      </Snackbar>
    </div>
  );
}

function UpdateAdvert(accessToken, setOpenModal, setModalText, userID) {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.querySelector('input[type="file"]');
  const url = "http://127.0.0.1:8000/api/marketplace/saleItems/";

  const form_data = new FormData();
  form_data.append("title", title);
  form_data.append("creator", userID);
  form_data.append("description", description);
  form_data.append("img", image.files[0]);
  form_data.append("price", price);

  axios
    .post(url, form_data, {
      headers: {
        Authorization: "Bearer " + accessToken,
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      }
    })
    .then(res => {
      console.log(res.data);
      console.log("Success!");
    })
    .catch(err => {
      if (err.response.status === 401) {
        setModalText("Din tilgangstoken har utløpt...");
      } else if (err.response.status === 400) {
        setModalText("Alle felter må fylles ut!");
      } else {
        setModalText(err.response.status + ": " + err.response.statusText);
      }
      console.log(err);
      setOpenModal(true);
    });
}
