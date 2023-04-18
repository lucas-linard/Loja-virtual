import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";;
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
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
import ImageIcon from '@mui/icons-material/Image';
import { useRouter } from "next/router";
export async function getServerSideProps() {
  const fs = require('fs')
  const res = await axios.get("http://localhost:8080/produtos");
  const data = res.data.content;
  data.map((item) => {
    let imageData = fs.readFileSync(item.imageUrl);
    let base64Image = Buffer.from(imageData).toString('base64');
    item.imageUrl = `data:image/jpeg;base64,${base64Image}`;
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
  const [categoryInput, setCategoryInput] = React.useState("");
  const [categories, setCategories] = React.useState(data);
  const router = useRouter()
  const apiRef = useGridApiRef();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
            <CardMedia image={params.row.imageUrl} alt="Minha Imagem" sx={{ width: 150, height: 150 }} />
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
    // {
    //   field: "categorias",
    //   headerName: "categorias",
    //   width: 100,
    //   editable: false,
    //   renderCell: (params) => {
    //     let cat = params.row.categorias.reduce((acc,cur) => acc += cur.nome)
    //   }
    // },
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
              onClick={() =>
                {
                  router.push({
                  pathname: '/admin/products/update',
                  query: { id: params.row.id },
                })
              }
              }
            >
              <ModeEditIcon />
            </IconButton>
          {/* <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteCategory(params)}
          >
            <DeleteForeverIcon />
          </IconButton> */}
        </div>
      )},
    },
  ];

  async function updateCategory(category) {
    const { id, nome } = category.row;

    try {
      const response = await axios.put(`http://localhost:3000/api/category`, {
        id,
        nome,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCategory(category) {
    const { id } = category.row;
    try {
      const response = await axios.delete(`http://localhost:3000/api/category?id=${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminLayout>
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
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </AdminLayout>
  );
}
