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
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import AdminLayout from "../../../components/AdminLayout";
import Cookies from "js-cookie";
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8080/categorias");
  const data = res.data.content;
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

  const JWT = Cookies.get("jwt");
  
  const apiRef = useGridApiRef();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {params.value}
            <IconButton
              variant="contained"
              onClick={() =>
                params.api.startCellEditMode({
                  id: params.id,
                  field: params.field,
                })
              }
            >
              <ModeEditIcon />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Ações",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() => updateCategory(params)}
          >
            <UpdateIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteCategory(params)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleChangeCategoryInput = (event) => {
    setCategoryInput(event.target.value);
  };

  async function createCategory(category) {
    try {
      const response = await axios.post("http://localhost:3000/api/category", {
        nome: category,
        jwt: "Bearer "+JWT,
      });
      setCategories([...categories, response.data]);
      enqueueSnackbar('Categoria criada com sucesso!', { variant: 'success' }); 
    } catch (error) {
      enqueueSnackbar('Erro ao criar categoria!', { variant: 'error' });
    }
  }

  async function updateCategory(category) {
    const { id, nome } = category.row;

    try {
      const response = await axios.put(`http://localhost:3000/api/category`, {
        id,
        nome,
      });
      enqueueSnackbar('Categoria atualizada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao atualizar categoria!', { variant: 'error' });
    }
  }

  async function deleteCategory(category) {
    const { id } = category.row;
    try {
      await axios.delete(`http://localhost:3000/api/category?id=${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      enqueueSnackbar('Categoria deletada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao deletar categoria!', { variant: 'error' });
    }
  }
  return (
    <AdminLayout>
      <SnackbarProvider/>
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
                    alignItems: "center",
                    justifyContent: "center",
                    height: 700,
                    width: "80%",
                  }}
                >
                  <Typography variant="h4">Criar categoria</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "70%",
                
                      marginTop: 3,
                    }}  
                  >
                    <TextField
                      id="categoriaInput"
                      label="Categoria"
                      variant="filled"
                      onChange={handleChangeCategoryInput}
                      value={categoryInput}
                      sx={{ width: "100%" }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => createCategory(categoryInput)}
                      sx={{ marginLeft: 6 }}
                    >
                      CRIAR
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      marginTop: 6,
                    }}
                  >
                    <Typography variant="h4">Gerenciar categorias</Typography>
                    <DataGrid
                      rows={categories}
                      columns={columns}
                      apiRef={apiRef}
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
