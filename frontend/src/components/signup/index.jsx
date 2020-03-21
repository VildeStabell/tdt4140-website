import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
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
            Registrer deg
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Brukernavn"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  id="telephone"
                  label="Telefon"
                  name="telephone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-post"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Passord"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {/* TODO: Terms of service page
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Jeg godtar betingelsene."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              onClick={event => {
                event.preventDefault();
                signUp(setRedirect, setOpenModal);
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrer
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to={"/signin"} variant="body2">
                  Har du allerede en bruker? Logg inn
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
          Registrering mislyktes! Prøv igjen
        </Alert>
      </Snackbar>
    </div>
  );
}

function signUp(setRedirect, setOpenModal) {
  var username = document.getElementById("username").value;
  var telephone = document.getElementById("telephone").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  const url = "http://localhost:8000/auth/users/";
  var error = false;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      phone: telephone,
      first_name: "F_navn",
      last_name: "E_navn",
      email: email,
      password: password,
      re_password: password
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
        console.log("Successfully created user");
        setRedirect(<Redirect to={"/signin"} />);
      } else {
        console.error(JSON.stringify(res));
      }
    });
}
