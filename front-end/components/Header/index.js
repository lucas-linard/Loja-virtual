import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Box,
  Alert,
} from "@mui/material";
import { ShoppingCart, Search, AccountCircle } from "@mui/icons-material";
import { StyledInputBase, StyledSearch, StyledTypography } from "./styles";
import { useRouter } from "next/router";
import Image from "next/image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#000",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function Header({
  loggedIn = false,
  onSearchChange,
  searchValue,
  token,
}) {
  
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton  onClick={() => router.push("/")}>
          <Image
            height={100}
            width={100}
            src="/logo.png"
          />
           
            </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <StyledSearch>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => onSearchChange(e.target.value)}
                value={searchValue}
                sx={{ width: "100%" }}
                endAdornment={
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    sx={{ marginRight: "0em" }}
                  >
                    <Search />
                  </IconButton>
                }
              />
            </StyledSearch>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mr: 0 }}>
            {!loggedIn ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => router.push("SignIn")}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Entrar
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => router.push("SignUp")}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Criar conta
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="inherit">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    Cookies.remove("jwt");
                    router.reload();
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Sair
                  </Typography>
                </IconButton>
              </>
            )}
            <IconButton
              color="inherit"
              sx={{ marginLeft: 5 }}
              onClick={() =>
                { if(token){
                  router.push({
                    pathname: "/shoppingCart",
                    query: { cart: token },
                  })
                } else {
                  alert("Faça login para acessar o carrinho")
                }
              }}
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
