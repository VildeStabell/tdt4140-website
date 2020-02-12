import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Container, Grid } from "@material-ui/core";
import "./style.css";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import SearchBar from "./components/searchbar";
import SaleItem from "./components/saleitem";

export default function App() {
  return (
    <Router>
      <div>
        <NavBar></NavBar>

        <Switch>
          <Route path="/signin"></Route>
          <Route path="/signup"></Route>
          <Route path="/product"></Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>

        <Box m={2}>
          <Footer></Footer>
        </Box>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Container maxWidth="md">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item className="search">
          <Box m={2}>
            <SearchBar />
          </Box>
        </Grid>
        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="flex-start"
        >
          {/* This is just added to test display of saleitems */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SaleItem />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
