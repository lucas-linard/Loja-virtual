import { useRouter } from 'next/router'

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import {
  FormControl,
  InputAdornment,
  TextField,
  Button,
  Alert,
  MenuItem,
} from "@mui/material";

import { AttachMoney as AttachMoneyIcon } from "@mui/icons-material";
import axios from "axios";

import AdminLayout from "../../components/AdminLayout";

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8080/categorias");
  const categorias = res.data.content;
  return { props: { categorias } };
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function CriarProduto({ categorias }) {
  const router = useRouter()

  const [product, setProduct] = useState({
    nome: "",
    preço: 0,
    categoria: "",
    imageUri: "",
    quantidade: 0,
  });
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = React.useState(true);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se todos os campos foram preenchidos
    const isFormValid = Object.values(product).every(
      (value) => value !== "" && value !== 0
    );

    if (isFormValid) {
      console.log(product); // Apenas para fins de demonstração
      setProduct({
        nome: "",
        preço: 0,
        categoria: "",
        imageUri: "",
        quantidade: 0,
      });
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  return (
    <AdminLayout router={router}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: 700,
                width: "80%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">Criar Produto</Typography>
              </Box>

              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  component="fieldset"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Nome"
                    name="nome"
                    value={product.nome}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ width: "80%" }}
                  />

                  <TextField
                    label="Preço"
                    name="preço"
                    type="number"
                    value={product.preço}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      min: 0,
                      step: 0.01,

                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "80%" }}
                  />

                  <TextField
                    label="Categoria"
                    name="categoria"
                    value={product.categoria}
                    onChange={handleChange}
                    margin="normal"
                    required
                    select
                    defaultValue="EUR"
                    helperText="Selecione uma categoria"
                    sx={{ width: "80%" }}
                  >
                    {categorias.map((option) => (
                      <MenuItem key={option.id} value={option.nome}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="URL da Imagem"
                    name="imageUri"
                    value={product.imageUri}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ width: "80%" }}
                  />

                  <TextField
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    value={product.quantidade}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      min: 0,
                      endAdornment: (
                        <Typography >Unidades</Typography>
                      ),
                    }}
                    sx={{ width: "80%" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "80%" }}
                  >
                    Adicionar Produto
                  </Button>

                  {formError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      Por favor, preencha todos os campos
                    </Alert>
                  )}
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </AdminLayout>
  );
}
