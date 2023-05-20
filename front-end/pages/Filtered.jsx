import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import { Grid, Box, Typography } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export async function getServerSideProps(context) {
  const fs = require('fs')
  console.log(context.query)
  const qcat = context.query
  const res = await axios.get("http://localhost:8080/produtos/categoria"+  qcat.id);
  const cat = await axios.get("http://localhost:8080/categorias");
  console.log(cat.data.content)
  const data = res.data.content;
  data.map((item) => {
    if (item.imageUrl) {
      let imageData = fs.readFileSync(item.imageUrl);
      let base64Image = Buffer.from(imageData).toString('base64');
      item.imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }
  })
  return { props: { ProductList: data, categories: cat.data.content } };
}

export default function Home({ ProductList, categories }) {
  const JWT = Cookies.get("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(ProductList);
  const [query, setQuery] = useState("");
  const router = useRouter()
  console.log(query)
  useEffect(() => {
    if (!!JWT) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(query.toLowerCase())
  );

  function handleAuthorityRedirect(user) {
    console.log(user)
    if (user.authorities === "ROLE_ADMIN") {
      router.push("/unauthorized")
    }
  }



  return (
    <Grid container>
      <SnackbarProvider />
      <Grid item>
        <Header loggedIn={isLoggedIn} onSearchChange={setQuery} searchValue={query} token={JWT} />
      </Grid>
      <Grid
        container
        mt="100px"
        px="10px"
        display={"flex"}
        flex={1}
        flexDirection={"row"}
        maxWidth={"100%"}
        alignItems={"center"}
        justifyContent={filteredProducts.length > 0 ? "flex-start" : "center"}
      >
        <Grid item
          maxWidth="20%"
          height="100vh"
          flex={3}

        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            bgcolor={"rgba(236, 236, 236)"}
            p={1}
            height={"700px"}
            borderRadius={4}
            
            >
              <Typography variant="h5" fontWeight="bold" mt={2} mb={1} textAlign={"center"}>Departamentos</Typography>
            {categories.map((item) => (
              <Button color="info" sx={{fontWeight: "bold"}} onClick={() => console.log("hello")}>{item.nome}</Button>
            ))
            }
          </Box>
        </Grid>
        <Grid item
          display={"flex"}
          flex={1}
          flexDirection={"row"}
          flexWrap={"wrap"}
          maxWidth={"75%"}
        >
          {filteredProducts.length > 0 ? (
            <Grid container spacing={2}>
              {filteredProducts.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Box sx={{
                    margin: "10px",
                  }}>
                    <Product
                      name={item.nome}
                      price={item.preco}
                      discount={item.desconto}
                      imageUrl={item.imageUrl}
                      onClick={() => router.push({ pathname: '/Product', query: { id: item.id } })}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h3" marginTop={10}>Nenhum produto encontado 😢</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>

  );
}
