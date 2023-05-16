import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import { Grid, Box, Typography } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export async function getServerSideProps() {
  const fs = require('fs')
  const res = await axios.get("http://localhost:8080/produtos");
  const data = res.data.content;
  data.map((item) => {
    if (item.imageUrl) {
      let imageData = fs.readFileSync(item.imageUrl);
      let base64Image = Buffer.from(imageData).toString('base64');
      item.imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }
  })

  return { props: { ProductList: data } };
}

export default function Home({ ProductList }) {
  const JWT = Cookies.get("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(ProductList);
  const [query, setQuery] = useState("");

  console.log(query)
  useEffect(() => {
    if (!!JWT) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <Grid container>
      <SnackbarProvider />
      <Grid item>
        <Header loggedIn={isLoggedIn} onSearchChange={setQuery} searchValue={query} />
      </Grid>
      <Grid
        container
        mt="100px"
        px="100px"
        display={"flex"}
        flex={1}
        flexDirection={"row"}
        maxWidth={"100%"}
        alignItems={"center"}
        justifyContent={filteredProducts.length > 0 ? "flex-start" : "center"}

      >
        {filteredProducts.length > 0 ? filteredProducts.map((item) => {
          return (
            <Grid item key={item.id}>
              <Box sx={{
                margin: "10px",
              }}>
                <Product
                  name={item.nome}
                  price={item.preco}
                  discount={item.desconto}
                  imageUrl={item.imageUrl}
                />
              </Box>
            </Grid>
          )
        }) : <Typography variant="h3" marginTop={10}>Nenhum produto encontado 😢</Typography>}
      </Grid>
    </Grid>
  );
}
