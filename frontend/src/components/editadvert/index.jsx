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
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

export default function EditAdvert({
  accessToken,
  user,
  getProducts,
  editProduct,
  selectedProduct
}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    if (editProduct) {
      const productUrl =
        "http://127.0.0.1:8000/api/marketplace/saleItems/" +
        selectedProduct +
        "/";
      axios.get(productUrl).then(res => {
        console.log("Successfully loaded product info");
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
        // setImage(res.data.img);
      });
    }
  }, []);

  return redirect ? (
    <Redirect to="/" />
  ) : (
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
              value={title}
              onChange={e => setTitle(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              fullWidth
              autoComplete="off"
              id="price"
              variant="outlined"
              label="Pris i NOK"
              value={price}
              onChange={e => setPrice(e.target.value)}
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
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <input
              className="img-upload"
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={() => setImageChanged(true)}
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
                UpdateAdvert(
                  accessToken,
                  setOpenModal,
                  setModalText,
                  user,
                  getProducts,
                  setRedirect,
                  editProduct,
                  selectedProduct,
                  imageChanged
                );
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

function UpdateAdvert(
  accessToken,
  setOpenModal,
  setModalText,
  user,
  getProducts,
  setRedirect,
  editProduct,
  selectedProduct,
  imageChanged
) {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.querySelector('input[type="file"]');
  const url = "http://127.0.0.1:8000/api/marketplace/saleItems/";

  const form_data = new FormData();
  form_data.append("title", title);
  form_data.append("creator", user.id);
  form_data.append("description", description);
  form_data.append("price", price);

  if (editProduct) {
    if (imageChanged) form_data.append("img", image.files[0]);
    axios
      .put(url + selectedProduct + "/", form_data, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        }
      })
      .then(res => {
        console.log("Successfully updated advert!");
        getProducts("");
        setRedirect(true);
      })
      .catch(err => {
        if (err.response.status === 401) {
          setModalText("Din tilgangstoken har utløpt...");
        } else if (err.response.status === 400) {
          setModalText("Alle felter må fylles ut!");
        } else {
          setModalText(err.response.status + ": " + err.response.statusText);
        }
        console.error(err);
        setOpenModal(true);
      });
  } else {
    form_data.append("img", image.files[0]);
    axios
      .post(url, form_data, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        }
      })
      .then(res => {
        console.log("Successfully created new advert!");
        getProducts("");
        setRedirect(true);
      })
      .catch(err => {
        if (err.response.status === 401) {
          setModalText("Din tilgangstoken har utløpt...");
        } else if (err.response.status === 400) {
          setModalText("Alle felter må fylles ut!");
        } else {
          setModalText(err.response.status + ": " + err.response.statusText);
        }
        console.error(err);
        setOpenModal(true);
      });
  }
}
