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
import { Link } from "react-router-dom";

export default function Product({ product, isLoggedIn }) {
  const { image, user } = product || {};
  const productLoaded = true;
  return productLoaded ? (
    <div>
      <Container maxWidth="md">
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} className="product-image">
            <img
              src="https://www.ikea.com/no/no/images/products/landskrona-3-seat-sofa-gunnared-dark-grey-metal__0602115_PE680184_S5.JPG?f=s"
              alt=""
              className="display-img"
            />
          </Grid>
          <Grid item xs={0} md={2}>
            {null}
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckLogInStatus user={user} isLoggedIn={isLoggedIn} />
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

function CheckLogInStatus({ user, isLoggedIn }) {
  return isLoggedIn ? <ContactInfo user={user} /> : <NotLoggedIn />;
}

function ContactInfo({ user }) {
  const { name, telephone, email } = user || {};
  return (
    <Paper className="contact-info" elevation={10}>
      <Typography variant="caption">Selger:</Typography>
      <Typography variant="h5">{name}</Typography>
      <Typography>+47 {telephone}</Typography>
      <Typography>{email}</Typography>
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
