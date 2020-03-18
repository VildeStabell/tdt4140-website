import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Container, Grid } from "@material-ui/core";
import "./style.css";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import SearchBar from "./components/searchbar";
import SaleItem from "./components/saleitem";
import SignIn from "./components/signin";
import Product from "./components/product";
import SignUp from "./components/signup";
import Loading from "./components/loading";
import EditAdvert from "./components/editadvert";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("refresh") ? true : false
  );

  useEffect(() => {
    getProducts("");
    refresh();
  }, []);

  function getProducts(query) {
    if (query === "") {
      const url = "http://127.0.0.1:8000/api/marketplace/saleItems/";
      axios.get(url).then(res => setProducts(res.data));
    } else {
      const url =
        "http://127.0.0.1:8000/api/marketplace/saleItems?search=" + query;
      axios.get(url).then(res => setProducts(res.data));
    }
  }

  function refresh() {
    const refreshUrl = "http://localhost:8000/auth/jwt/refresh";
    axios
      .post(
        refreshUrl,
        {
          refresh: localStorage.getItem("refresh")
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(res => setAccessToken(res.data.access))
      .catch(() => {
        console.log("Refresh token expired!");
        setLoggedIn(false);
      });
  }

  return (
    <Router>
      <div>
        <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route path="/signin">
            <SignIn
              setLoggedIn={setLoggedIn}
              setAccesstoken={setAccessToken}
              setUser={setUser}
            />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/product">
            <Product
              selectedProduct={selectedProduct}
              isLoggedIn={isLoggedIn}
              user={user}
              refresh={refresh}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/editadvert">
            <EditAdvert accessToken={accessToken} user={user} />
          </Route>
          <Route path="/">
            <Container maxWidth="md">
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item className="search">
                  <Box m={2}>
                    <SearchBar getProducts={getProducts} />
                  </Box>
                </Grid>
                <Home
                  products={products}
                  callback={setSelectedProduct}
                  getProducts={getProducts}
                />
              </Grid>
            </Container>
          </Route>
        </Switch>

        <Box m={2}>
          <Footer className="footer" />
        </Box>
      </div>
    </Router>
  );
}

function Home({ products, callback, getProducts }) {
  var productList = products.map(product => (
    <Grid
      key={product.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => callback(product.id)}
    >
      <SaleItem
        productID={product.id}
        title={product.title}
        price={product.price}
        image={product.img}
      />
    </Grid>
  ));

  return productList.length >= 1 ? (
    <Grid
      item
      container
      spacing={4}
      alignItems="flex-start"
      justify="flex-start"
    >
      {productList}
    </Grid>
  ) : (
    <Loading />
  );
}
