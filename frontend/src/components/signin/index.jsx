import React, { useState, useEffect } from "react";
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

export default function SignIn({ setLoggedIn }) {
  const [redirect, setRedirect] = useState(null);
  const classes = useStyles();
  return redirect ? (
    redirect
  ) : (
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
            id="username"
            label="Brukernavn"
            name="username"
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
            onClick={() => {
              signIn(setRedirect, setLoggedIn);
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
  );
}

async function signIn(setRedirect, setLoggedIn) {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  const url = "http://localhost:8000/token-auth/";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(res => {
      if (res.status >= 400) {
        console.log("Error");
      }
      return res.json();
    })
    .then(res => {
      if (res.token === undefined) {
        console.log("Got no token");
      } else {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setRedirect(<Redirect to={"/"} />);
      }
    });
}
