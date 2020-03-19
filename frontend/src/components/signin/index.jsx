import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn({ setLoggedIn, setAccesstoken, setUser }) {
  const [redirect, setRedirect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  return redirect ? (
    redirect
  ) : (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logg inn
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-post adresse"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passord"
              type="password"
              id="password"
              autoComplete="off"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Husk meg"
            />
            <Button
              type="submit"
              onClick={e => {
                e.preventDefault();
                signIn(
                  setRedirect,
                  setLoggedIn,
                  setOpenModal,
                  setAccesstoken,
                  setUser
                );
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Logg Inn
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to={"/signup"} variant="body2">
                  {"Har du ikke en konto? Registrer deg her"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Snackbar
        open={openModal}
        autoHideDuration={4000}
        onClose={() => setOpenModal(false)}
      >
        <Alert onClose={() => setOpenModal(false)} severity="error">
          Feil brukernavn eller passord!
        </Alert>
      </Snackbar>
    </div>
  );
}

async function signIn(
  setRedirect,
  setLoggedIn,
  setOpenModal,
  setAccesstoken,
  setUser
) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:8000/auth/jwt/create";
  var error = false;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => {
      if (res.status >= 400) {
        error = true;
        setOpenModal(true);
      }
      return res.json();
    })
    .then(res => {
      if (!error) {
        console.log("Successfully logged in!");
        console.log(res);
        localStorage.setItem("refresh", res.refresh);
        localStorage.setItem("access", res.access);
        setAccesstoken(res.access);
        setLoggedIn(true);

        axios
          .get("http://localhost:8000/auth/users/me/", {
            headers: {
              Authorization: "Bearer " + res.access
            }
          })
          .then(res => {
            setUser(res.data);
          })
          .catch(err => {
            console.log(err);
          });

        setRedirect(<Redirect to={"/"} />);
      } else {
        console.log(res);
      }
    });
}
