import { useRouter } from 'next/router'

import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import AdminLayout from "../../components/AdminLayout";
import { uniqueId } from "lodash";
import filesize from "filesize";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tagsInput, setTagsInput] = useState('')
  const [tagsCollection, setTagsCollection] = useState([])
  const [product, setProduct] = useState({
    nome: "",
    preco: 0,
    desconto: 0,
    descricao: "",
    categoria: "",
    nomeVar: "",
    variacao: { nome: '', variacoes: [] },
    imageUri: "",
    quantidade: 0,
    tipo: "Físico",

  });
  const [formError, setFormError] = useState(false);
  const JWT = Cookies.get("jwt");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  async function processUpload(uploadedFile) {
    const data = new FormData();
   
    
    try {
      if (!!uploadedFile) {
        data.append("file", uploadedFile.file, uploadedFile.name);
        const res = await axios.post('http://localhost:8080/produtos/upload-image', data, { headers: { Authorization: `Bearer ${JWT}` } });
        product.imageUrl = res.data.imageUrl
      }

      const catIds = categorias.find((cat) => cat.nome == product.categoria)

      product.variacao.nome = product.nomeVar
      product.variacao.variacoes = tagsCollection
      product.categoriaIds = [catIds?.id]

      const res = await axios.post('http://localhost:8080/produtos', product, { headers: { Authorization: `Bearer ${JWT}` } })
      enqueueSnackbar('Produto criado com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Não foi possivel criar o produto, Confira os campos\nou tente novamente mais tarde!', { variant: 'error' });
    }

  }

  function handleUpload(files) {
    const newFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles([ ...newFiles]);

    // newFiles.forEach(processUpload);
  }

  function handleDelete(id) {
    //await api.delete(`posts/${id}`);

    setUploadedFiles((prevState) =>
      prevState.filter((file) => file.id !== id)
    );
  }

  function handleAuthorityRedirect(user) {
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
  },[])

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
                width: "80%",
              }}
            >
                <Typography variant="h4">Bem vindo ao painel administrativo</Typography>
                <Typography variant="h6">Confira as opcões no meno lateral</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
}
