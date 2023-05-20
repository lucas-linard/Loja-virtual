import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import {
  Grid,
  Box,
  Typography,
  CardMedia,
  Card,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  Radio,
  Divider,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddIcon from "@mui/icons-material/Add";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const fs = require("fs");
  const { cart: JWT } = context.query;
  const { data } = await axios.get("http://localhost:8080/cart", {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  data.map((item) => {
    if (item.produto.imageUrl) {
      let imageData = fs.readFileSync(item.produto.imageUrl);
      let base64Image = Buffer.from(imageData).toString("base64");
      item.produto.imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }
  });

  return { props: { ProductList: data } };
}

function Counter({ value, onAdd, onSubtract, onRemove }) {
  return (
    <Box display={"flex"} alignItems={"flex-start"} marginLeft={27}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        width={100}
        height={30}
        bgcolor={"#fff"}
        border={1}
        borderRadius={3}
      >
        <IconButton onClick={onSubtract} aria-label="delete">
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6">{value}</Typography>
        <IconButton onClick={onAdd} aria-label="delete">
          <AddIcon />
        </IconButton>
      </Box>
      <Box mt={-0.5} ml={2}>
        <IconButton onClick={onRemove} aria-label="delete">
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function Home({ ProductList }) {
  const JWT = Cookies.get("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(ProductList);
  const [query, setQuery] = useState("");
  const [cep, setCep] = useState("");
  const [showFrete, setshowFrete] = useState(false);
  const router = useRouter();
  const data = new Date();
  data.setDate(data.getDate() + 9);
  let diaSemana = data.toLocaleString("pt-BR", { weekday: "long" });
  let nomeMes = data.toLocaleString("pt-BR", { month: "long" });

  function handleAuthorityRedirect(user) {
    console.log(user);
    if (user.authorities === "ROLE_ADMIN") {
      router.push("/unauthorized");
    }
  }

  async function handleRemoveCart(id) {
    console.log("test");
    console.log(JWT);
    try {
      const res = await axios.delete(` http://localhost:8080/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
    setProducts((oldState) => {
      const newState = [...oldState];
      const index = newState.findIndex((p) => p.produto.id === id);
      newState.splice(index, 1);
      return newState;
    });
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
        <Header
          loggedIn={isLoggedIn}
          onSearchChange={setQuery}
          searchValue={query}
          token={JWT}
        />
      </Grid>
      <Grid
        container
        mt="100px"
        px="10px"
        display={"flex"}
        flex={1}
        flexDirection={"row"}
      >
        <Grid
          item
          display={"flex"}
          flex={8}
          flexDirection={"column"}
          //maxWidth={"75%"}
          bgcolor={"rgba(236, 236, 236)"}
          borderRadius={3}
          padding={2}
        >
          <Box display={"flex"} paddingRight={2} paddingLeft={4} marginTop={1}>
            <Typography variant="h6">Produto</Typography>
            <Typography ml={15} variant="h6">
              Nome
            </Typography>
            <Typography ml={34} variant="h6">
              Preço unitario
            </Typography>
            <Typography ml={35} variant="h6">
              Quantidade
            </Typography>
            <Typography flex={1} textAlign={"end"} variant="h6">
              Valor total
            </Typography>
          </Box>
          {products.length > 0 ? (
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              {products.map((product) => {
                const indexOfProduct = products.findIndex(
                  (p) => p.produto.id === product.produto.id
                );
                return (
                  <>
                    <Box
                      display={"flex"}
                      marginX={2}
                      padding={2}
                      borderRadius={3}
                      gap={2}
                      bgcolor={"#fff"}
                    >
                      <Card>
                        <CardMedia
                          image={product.produto.imageUrl}
                          title={"image"}
                          sx={{ height: 100, width: 100 }}
                        />
                      </Card>
                      <Typography
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                        variant="subtitle1"
                        marginLeft={10}
                        width={200}
                        maxHeight={80}
                      >
                        {product.produto.nome}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        marginLeft={16}
                        width={150}
                        maxHeight={80}
                      >
                        R${" "}
                        {(
                          product.produto.preco *
                          (1 - product.produto.desconto / 100)
                        ).toFixed(2)}
                      </Typography>
                      <Counter
                        value={product.quantidade}
                        onAdd={async () => {
                          try {
                            await axios.put(
                              `http://localhost:8080/cart/add/${product.id}`,
                              {},
                              {
                                headers: {
                                  Authorization: `Bearer ${JWT}`,
                                },
                              }
                            );
                            setProducts((oldState) => {
                              const newState = [...oldState];
                              newState[indexOfProduct].quantidade =
                                newState[indexOfProduct].quantidade + 1;
                              return newState;
                            });
                          } catch (error) {
                            enqueueSnackbar(
                              "Erro ao alterar quantidade de itens no carrinho",
                              { variant: "error" }
                            );
                          }
                        }}
                        onSubtract={async () => {
                          try {
                            await axios.put(
                              `http://localhost:8080/cart/rem/${product.id}`,
                              {},
                              {
                                headers: {
                                  Authorization: `Bearer ${JWT}`,
                                },
                              }
                            );
                            setProducts((oldState) => {
                              const newState = [...oldState];
                              newState[indexOfProduct].quantidade > 1
                                ? (newState[indexOfProduct].quantidade -= 1)
                                : null;
                              return newState;
                            });
                          } catch (error) {
                            enqueueSnackbar(
                              "Erro ao alterar quantidade de itens no carrinho",
                              { variant: "error" }
                            );
                          }
                        }}
                        onRemove={() => handleRemoveCart(product.id)}
                      />
                      <Typography
                        variant="h6"
                        width={200}
                        flex={1}
                        textAlign={"end"}
                      >
                        R$ {((
                          product.produto.preco *
                          (1 - product.produto.desconto / 100)
                        ) * product.quantidade).toFixed(2)}
                      </Typography>
                    </Box>
                  </>
                );
              })}
            </Box>
          ) : (
            <Box
              display={"flex"}
              flex={1}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4" textAlign={"center"}>
                Carrinho vazio
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Adicione itens ao seu carrinho e aproveite nossas promoções 😎
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          display={"flex"}
          flex={2}
          flexDirection={"column"}
          // maxWidth={"20%"}
          ml={2}
          height={600}
          bgcolor={"rgba(236, 236, 236)"}
          borderRadius={3}
          padding={2}
        >
          <Box
            display={"flex"}
            flex={1}
            flexDirection={"column"}
            paddingX={2}
            marginTop={1}
          >
            <Typography variant="h6">Pagamento</Typography>
            <Divider />
            <Box display={"flex"} flex={1} flexDirection={"column"} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="CARTÃO DE CRÉDITO"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="PAYPAL"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="PIX"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                display={"flex"}
                flex={1}
                justifyContent={"center"}
                alignItems={"flex-end"}
              >
                <TextField
                  placeholder="CEP"
                  variant="outlined"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="info"
                  sx={{ marginLeft: 3 }}
                  onClick={() => {
                    if (cep.trim().length === 8) {
                      setshowFrete(true);
                    } else {
                      setshowFrete(false);
                      enqueueSnackbar(
                        "Informe um cep valido! (Apenas números)",
                        { variant: "warning" }
                      );
                    }
                  }}
                >
                  Calcular frete
                </Button>
              </Box>
              {showFrete && (
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
              )}
              <Box
                display={"flex"}
                flex={1}
                flexDirection={"column"}
                justifyContent={"flex-end"}
              >
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    R${" "}
                    {products
                      .reduce(
                        (acumulador, produto) =>
                          acumulador +
                          produto.produto.preco *
                            (1 - produto.produto.desconto / 100) *
                            produto.quantidade,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Box>
                <Button variant="contained" color="success">
                  Finalizar compra
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
