import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Rating,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export async function getServerSideProps(context) {
  const fs = require("fs");
  const res = await axios.get(
    `http://localhost:8080/produtos/${context.query.id}`
  );
  const data = res.data;

  let imageData = fs.readFileSync(data.imageUrl);
  let base64Image = Buffer.from(imageData).toString("base64");
  data.imageUrl = `data:image/jpeg;base64,${base64Image}`;

  return { props: { Product: data } };
}

export default function Home({ Product }) {
  const JWT = Cookies.get("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const data = new Date();
  data.setDate(data.getDate() + 9);
  let diaSemana = data.toLocaleString("pt-BR", { weekday: "long" });
  let nomeMes = data.toLocaleString("pt-BR", { month: "long" });

  async function handleAddCart() {
    if(!JWT) {
        return enqueueSnackbar("Faça Login para adicionar produtos ao carrinho!", {
            variant: "warning",
          });
    }
    try {
      await axios.post(
        `http://localhost:8080/cart`,
        { produtoId: Product.id },
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      enqueueSnackbar("Produto adicionado ao carrinho com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!!JWT) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <Grid container>
      <SnackbarProvider />
      <Grid item>
        <Header loggedIn={isLoggedIn} token={JWT} />
      </Grid>
      <Grid
        container
        mt="100px"
        px="100px"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Grid item display={"flex"}>
          <Card sx={{ width: "100%", background: "#F7F7F7" }}>
            <CardContent
              sx={{ display: "flex", flex: 1, flexDirection: "column" }}
            >
              <Grid
                item
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <CardMedia
                    image={Product.imageUrl}
                    sx={{ width: 668, height: 468 }}
                  />
                  <Divider variant="fullWidth" sx={{ marginTop: 3 }} />
                  <Box flexDirection={"column"} width={"668px"}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ marginTop: 3 }}
                    >
                      Descrição
                    </Typography>
                    <Typography variant="subtitle1">
                      {Product.descricao}
                    </Typography>
                  </Box>
                </Box>
                <Card sx={{ display: "flex", height: "fit-content",  marginLeft: 10 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: 300,
                    }}
                  >
                    <Typography variant="h5" component="div" fontWeight="bold">
                      {Product.nome}
                    </Typography>
                    <Rating
                      size="small"
                      name="half-rating"
                      defaultValue={4.5}
                      precision={0.5}
                    />
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ marginTop: 2 }}
                    >
                      R${" "}
                      {(Product.preco * (1 - Product.desconto / 100)).toFixed(
                        2
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: 2, width: "auto" }}
                    >
                      em 12x de R$ {(Product.preco / 12).toFixed(2)} sem juros
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <LocalShippingIcon
                        sx={{ marginBottom: "4px", marginRight: "10px" }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ marginTop: 2, width: "auto" }}
                      >
                        Chegará {diaSemana} {data.getDate()} de {nomeMes}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={"bold"}
                      sx={{ marginTop: 3 }}
                    >
                      Estoque disponível
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#3483fa",
                          width: "100%",
                          height: 45,
                          marginTop: 4,
                          fontWeight: "bold",
                          fontSize: "16px",
                          textTransform: "capitalize",
                        }}
                      >
                        Comprar agora
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#d9e7fa",
                          ":hover": {
                            backgroundColor: "#d1e1f1",
                          },
                          width: "100%",
                          marginTop: 1,
                          height: 45,
                          color: "#3483fa",
                          fontWeight: "bold",
                          fontSize: "16px",
                          textTransform: "capitalize",
                        }}
                        onClick={handleAddCart}
                      >
                        Adicionar ao carrinho
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
