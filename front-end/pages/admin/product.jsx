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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import PercentIcon from '@mui/icons-material/Percent';
import { AttachMoney as AttachMoneyIcon } from "@mui/icons-material";
import axios from "axios";

import AdminLayout from "../../components/AdminLayout";
import MultiValueInput from "../../components/MultiValueInput";
import Upload from '../../components/Upload'
import FileList from '../../components/FileList'
import { uniqueId } from "lodash";
import filesize from "filesize";


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
    variacoes: [],
    imageUri: "",
    quantidade: 0,
    tipo: "Físico",

  });
  const [formError, setFormError] = useState(false);

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
      ; // Apenas para fins de demonstração
      setProduct({
        nome: "",
        descricao: "",
        preco: 0,
        desconto: 0,
        quantidade: 1,
        categoria: "",
        imageUri: "",
        tipo: "Físico"
      });
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  async function processUpload(uploadedFile) {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);
    console.log(data)

    axios.interceptors.request.use(request => {
      console.log('Request data:', request.data);
      return request;
    });

    await axios.post('http://localhost:8080/produtos/upload-image', data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );

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

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    // newFiles.forEach(processUpload);
  }

  function handleDelete(id) {
    //await api.delete(`posts/${id}`);

    setUploadedFiles((prevState) =>
      prevState.filter((file) => file.id !== id)
    );
  }

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
                width: "80%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h4">Criar Produto</Typography>
              </Box>


              <FormControl
                fullWidth
                component="fieldset"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start"
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
                  label="Descrição"
                  name="descricao"
                  multiline
                  minRows={3}

                  value={product.descricao}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ width: "80%" }}
                />

                <TextField
                  label="Preço"
                  name="preco"
                  type="number"
                  value={product.preco}
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
                  label="Desconto"
                  name="desconto"
                  value={product.desconto}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    min: 0,
                    step: 0.01,

                    startAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
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
                  label="Nome da variação"
                  name="nomeVar"
                  value={product.nomeVar}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ width: "20%" }}
                />

                <MultiValueInput
                  inputValue={tagsInput}
                  onInputChange={setTagsInput}
                  onAdd={setTagsCollection}
                  onDelete={setTagsCollection}
                  items={tagsCollection}
                >

                </MultiValueInput>

                <Upload
                  onUpload={handleUpload}
                />
                {!!uploadedFiles.length && (
                  <FileList files={uploadedFiles}
                    onDelete={handleDelete}
                  />
                )}

                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Tipo</FormLabel>
                  <RadioGroup
                    row
                    style={{ display: 'flex' }}
                    name="group"
                    value={product.tipo}
                    onChange={handleChange}
                  >
                    <FormControlLabel name="tipo" value="Físico" control={<Radio />} label="Físico" />
                    <FormControlLabel name="tipo" value="Digital" control={<Radio />} label="Digital" />
                  </RadioGroup>
                </FormControl>

                {formError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Por favor, preencha todos os campos
                  </Alert>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "80%", marginLeft: 10 }}
                onClick={() => processUpload(uploadedFiles[0])}
              >
                Adicionar Produto
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </AdminLayout>
  );
}
