import React from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Product from "../components/Product";
import { Grid } from "@mui/material";
import { SnackbarProvider } from 'notistack';

export default function Home() {
  
  return (
      <Grid container spacing={8} >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item spacing={3}>
          <SnackbarProvider>
            <Product />
          </SnackbarProvider>
        </Grid>
      </Grid>
  );
}
