import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./category/listItems";
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
import { useGridApiRef } from "@mui/x-data-grid";

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function CriarProduto({ categorias }) {
    console.log(categorias)
  const [product, setProduct] = useState({
    nome: "",
    preço: 0,
    categoria: "",
    imageUri: "",
    quantidade: 0,
  });
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
