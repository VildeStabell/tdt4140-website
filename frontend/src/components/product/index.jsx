import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  CircularProgress
} from "@material-ui/core";
import "./style.css";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Product({
  selectedProduct,
  isLoggedIn,
  user,
  refresh,
  accessToken,
  getProducts
}) {
  const [redirect, setRedirect] = useState(false);
  const [product, setProduct] = useState({ img: "no image loaded" });
  const [creator, setCreator] = useState(null);
  const [productLoaded, setProductLoaded] = useState(false);

  useEffect(() => {
    console.log("%cReloading product component", "color: orange");
    const productUrl =
      "http://127.0.0.1:8000/api/marketplace/saleItems/" + selectedProduct;
    axios.get(productUrl).then(res => {
      console.log("Successfully loaded product info");
      setProduct(res.data);
      setProductLoaded(true);
      const creatorUrl =
        "http://localhost:8000/api/marketplace/profile/" +
        res.data.creator +
        "/";
      if (isLoggedIn) {
        axios
          .get(creatorUrl, {
            headers: {
              Authorization: "Bearer " + accessToken
            }
          })
          .then(res => {
            console.log("Successfully loaded creator info");
            setCreator(res.data);
          })
          .catch(err => {
            console.error("Failed to load creator info");
            refresh();
          });
      }
    });
  }, [accessToken, isLoggedIn, refresh, selectedProduct]);
  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return productLoaded ? (
      <div>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={6} md={3} className="admin">
              <DeleteBtn
                creator={creator}
                user={user}
                isLoggedIn={isLoggedIn}
                accessToken={accessToken}
                selectedProduct={selectedProduct}
                setRedirect={setRedirect}
                getProducts={getProducts}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} className="product-image">
              <img src={product.img} alt="" className="display-img" />
            </Grid>
            <Grid item xs={false} md={2}>
              {null}
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckLogInStatus creator={creator} isLoggedIn={isLoggedIn} />
            </Grid>
            <Grid item sm={12} md={7}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Container>
      </div>
    ) : (
      <div className="loader-container">
        <div className="loader">
          <CircularProgress />
        </div>
      </div>
    );
  }
}

function CheckLogInStatus({ creator, isLoggedIn }) {
  return isLoggedIn && creator != null ? (
    <ContactInfo creator={creator} />
  ) : (
    <NotLoggedIn />
  );
}

function ContactInfo({ creator }) {
  return (
    <Paper className="contact-info" elevation={10}>
      <Typography variant="caption">Selger:</Typography>
      <Typography variant="h5">
        {/* {creator.first_name} {creator.last_name} */}
        {creator.username}
      </Typography>
      <Typography>+47 {creator.phone}</Typography>
      <Typography>{creator.email}</Typography>
      <Button
        component={Box}
        mt={2}
        variant="contained"
        color="primary"
        startIcon={<MessageIcon />}
      >
        Send melding
      </Button>
    </Paper>
  );
}

function NotLoggedIn() {
  return (
    <Paper className="contact-info" elevation={10}>
      <Grid container direction="column" justify="center">
        <Typography variant="h6" align="center">
          Du må logge inn for å se kontaktinformasjon
        </Typography>
        <Button
          component={(Box, Link)}
          to={"/signin"}
          mt={2}
          variant="contained"
          color="primary"
          startIcon={<PersonIcon />}
        >
          Logg inn
        </Button>
      </Grid>
    </Paper>
  );
}

function ProductInfo({ product }) {
  const { title, description, price } = product || {};
  return (
    <Grid container direction="column" alignItems="flex-start" justify="center">
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h3" color="primary">
        {price} kr
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Grid>
  );
}

function DeleteBtn({
  creator,
  user,
  isLoggedIn,
  accessToken,
  selectedProduct,
  setRedirect,
  getProducts
}) {
  return isLoggedIn &&
    creator != null &&
    user != null &&
    creator.id === user.id ? (
    <Button
      fullWidth
      className="admin-btn"
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={() =>
        deleteProduct(accessToken, selectedProduct, setRedirect, getProducts)
      }
    >
      Slett annonse
    </Button>
  ) : (
    <></>
  );
}

function deleteProduct(accessToken, selectedProduct, setRedirect, getProducts) {
  const deleteUrl =
    "http://127.0.0.1:8000/api/marketplace/saleItems/" + selectedProduct;
  axios
    .delete(deleteUrl, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(() => {
      getProducts("");
      setRedirect(true);
    })
    .catch(err => console.error(err));
}
