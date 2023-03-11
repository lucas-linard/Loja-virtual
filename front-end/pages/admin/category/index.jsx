import * as React from "react";
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
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

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

export default function DashboardContent({ data }) {
  const [categoryInput, setCategoryInput] = React.useState("");
  const [categories, setCategories] = React.useState(data);

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
      });
      setCategories([...categories, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
