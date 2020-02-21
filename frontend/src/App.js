import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Container, Grid } from "@material-ui/core";
import "./style.css";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import SearchBar from "./components/searchbar";
import SaleItem from "./components/saleitem";
import SignIn from "./components/signin";
import Product from "./components/product";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    console.log("User is logged in: " + isLoggedIn);
    // This is just mock api, change with actual api url eventually
    fetch("https://5e4d41479b6805001438fbca.mockapi.io/products")
      .then(response => {
        if (response.status > 400) {
          console.log("Error: " + response.status + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      });
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/signin">
            <SignIn setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/signup"></Route>
          <Route path="/product">
            <Product
              product={products[selectedProduct - 1]}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/">
            <Home products={products} callback={setSelectedProduct} />
          </Route>
        </Switch>

        <Box m={2}>
          <Footer className="footer" />
        </Box>
      </div>
    </Router>
  );
}

function Home({ products, callback }) {
  var productList = products.map(product => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => callback(product.id)}
    >
      <SaleItem
        key={product.id}
        productID={product.id}
        title={product.title}
        price={product.price}
      />
    </Grid>
  ));

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
          {productList}
        </Grid>
      </Grid>
    </Container>
  );
}
