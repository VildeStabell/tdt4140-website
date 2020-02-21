import React, { useState } from "react";
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
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <Router>
      <div>
        <NavBar />

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup"></Route>
          <Route path="/product">
            <Product
              product={{
                title: "Fin og behagelig 6 seters sofa til salgs.",
                description:
                  "Kun noen år gammel. Mener den ble kjøpt hos Skeidar for ca 5 år siden. Den er tatt godt vare på og er ren og fin. Har ikke vært i kontakt med husdyr. Selges for min mor.",
                image:
                  "https://www.ikea.com/no/no/images/products/landskrona-3-seat-sofa-gunnared-dark-grey-metal__0602115_PE680184_S5.JPG?f=s",
                price: 2000
              }}
              user={{
                name: "Ola Nordmann",
                telephone: "95491672",
                email: "example@email.com"
              }}
            />
          </Route>
          <Route path="/">
            <Home
              // {/* This is just added to test display of saleitems */}
              products={[
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
                { id: 11 }
              ]}
            />
          </Route>
        </Switch>

        <Box m={2}>
          <Footer className="footer" />
        </Box>
      </div>
    </Router>
  );
}

function Home({ products }) {
  var productList = products.map(product => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SaleItem productID={product.id} />
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
