import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";;
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Card, CardMedia, Button } from "@mui/material";
import axios from "axios";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import AdminLayout from "../../../components/AdminLayout";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useRouter } from "next/router";
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
  return { props: { data } };
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






export default function DashboardContent({ data }) {
  const [categories, setCategories] = React.useState(data);
  const [openLoader, setOpenLoader] = React.useState(false);
  const router = useRouter()
  const apiRef = useGridApiRef();
  const JWT = Cookies.get("jwt");
  const columns = [
    {
      field: "picture",
      headerName: "Foto",
      width: 200,
      height: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Card>
            <CardMedia image={params.row.imageUrl ? params.row.imageUrl : "https://betarill.com/media/images/products/default_product.png"} alt="Minha Imagem" sx={{ width: 150, height: 150 }} />
          </Card>
        );
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      editable: false,
    },
    {
      field: "preco",
      headerName: "preco",
      width: 100,
      editable: false,
    },
    {
      field: "quantidade",
      headerName: "quantidade",
      width: 100,
      editable: false,
    },
    {
      field: "desconto",
      headerName: "desconto",
      width: 80,
      editable: false,
    },
    {
      field: "tipo",
      headerName: "tipo",
      width: 100,
      editable: false,
    },
    {
      field: "id",
      headerName: "Ações",
      width: 300,
      editable: false,
      renderCell: (params) => {

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              variant="contained"
              onClick={() => {
                setOpenLoader(true);
                router.push({
                  pathname: '/admin/products/update',
                  query: { id: params.row.id },
                })
              }
              }
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => deleteProduct(params.row)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        )
      },
    },
  ];

  async function deleteProduct({ id }) {
    try {
      await axios.delete(`http://localhost:8080/produtos/${id}`, { headers: { Authorization: `Bearer ${JWT}` } });
      const newCategories = categories.filter((item) => item.id !== id);
      setCategories(newCategories);
      enqueueSnackbar('Produto deletado com sucesso!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Houve um problema ao deletar produto!', { variant: 'error' })
    }
  }
  function handleAuthorityRedirect(user) {
    console.log(user)
    if (user.authorities !== "ROLE_ADMIN") {
      router.push("/unauthorized")
    }
  }

  React.useEffect(() => {
    if (JWT) {
      const decoded = jwt_decode(JWT);
      handleAuthorityRedirect(decoded);
    } else {
      router.push("/unauthorized")
    }
  }, [])

  return (
    <AdminLayout>
      <SnackbarProvider />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 1000,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  marginTop: 6,
                }}
              >
                <Typography variant="h4">Gerenciar Produtos</Typography>
                <DataGrid
                  rows={categories}
                  columns={columns}
                  apiRef={apiRef}
                  rowHeight={150}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  sx={{ width: "100%", height: "100%", marginTop: 3 }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />

              </Box>
            </Paper>
          </Grid>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </AdminLayout>
  );
}
