import React from "react";
import { Grid, Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import "./style.css";

export default function NavBar({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography
                component={Link}
                to={"/"}
                variant="h4"
                type="title"
                color="inherit"
                style={{ textDecoration: "none" }}
              >
                SellYo'Shit
              </Typography>
            </Grid>
            <Grid item className="buttons">
              <NavButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
              <NewAdd isLoggedIn={isLoggedIn} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function NavButton({ isLoggedIn, setLoggedIn }) {
  return isLoggedIn ? (
    <SignOutButton setLoggedIn={setLoggedIn} />
  ) : (
    <SignInButton />
  );
}

function SignInButton() {
  return (
    <Button
      component={Link}
      to="/signin"
      variant="contained"
      startIcon={<PersonIcon />}
    >
      Logg inn
    </Button>
  );
}

function SignOutButton({ setLoggedIn }) {
  return (
    <Button
      variant="contained"
      startIcon={<ExitToAppIcon />}
      onClick={() => signOut(setLoggedIn)}
    >
      Logg ut
    </Button>
  );
}

function signOut(setLoggedIn) {
  localStorage.removeItem("token");
  setLoggedIn(false);
}

function NewAdd({ isLoggedIn }) {
  return isLoggedIn ? (
    <Button
      component={Link}
      to="/editadvert"
      variant="contained"
      startIcon={<AddIcon />}
    >
      Ny annonse
    </Button>
  ) : (
    <></>
  );
}
