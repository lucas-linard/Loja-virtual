import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import { ShoppingCart, Search, AccountCircle } from "@mui/icons-material";
import { StyledInputBase, StyledSearch, StyledTypography } from "./styles";
export default function Header() {


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          My Store
        </Typography>
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
              sx={{ width: "100%" }}
              endAdornment={
                <IconButton size="large" edge="end" sx={{ marginRight: "0em" }}>
                  <Search />
                </IconButton>
              }
            />
          </StyledSearch>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mr: 0 }}>
          <IconButton color="inherit">
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Sign in
            </Typography>
          </IconButton>
          <IconButton color="inherit">
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Sign up
            </Typography>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
