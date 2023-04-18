import { useRouter } from 'next/router'

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  Card, CardMedia
} from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import PercentIcon from '@mui/icons-material/Percent';
import { AttachMoney as AttachMoneyIcon } from "@mui/icons-material";
import axios from "axios";

import AdminLayout from "../../../components/AdminLayout";
import MultiValueInput from "../../../components/MultiValueInput";
import Upload from '../../../components/Upload'
import FileList from '../../../components/FileList'
import { uniqueId } from "lodash";
import filesize from "filesize";


export async function getServerSideProps(context) {
  const fs = require('fs')
  try {
    const categories = await axios.get("http://localhost:8080/categorias");
    let product = await axios.get("http://localhost:8080/produtos/" + context.query.id)
   console.log(product.data)
    let imageData = fs.readFileSync(product.data.imageUrl);
    let base64Image = Buffer.from(imageData).toString('base64');
    product.data.image = `data:image/jpeg;base64,${base64Image}`
    
    return { props: { product: product.data, categories: categories.data.content } };
  } catch (error) {
    console.log(error)
  }
  
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

export default function CriarProduto({ categories, product }) {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tagsInput, setTagsInput] = useState('')
  const [tagsCollection, setTagsCollection] = useState(product.variacao.variacoes)
  const [tipo, setTipo] = useState(product.tipo)
const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nome: product.nome,
      preco: product.preco,
      desconto: product.desconto,
      descricao: product.descricao,
      categoria: product.categorias[0].nome,
      variacao: { nome: '', variacoes: [] },
      nomeVar: product.variacao.nome,
      imageUrl: product.imageUrl,
      quantidade: product.quantidade,
      tipo: product.tipo,
      categoriaIds: ''
    }
});


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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  async function handleSubmitForm(form,uploadedFile){
    const data = new FormData();
    try {
      if (!!uploadedFiles[0]) {
        console.log(uploadedFiles)
        data.append("file", uploadedFiles[0].file, uploadedFiles[0].name);
        const res = await axios.post('http://localhost:8080/produtos/upload-image', data);
        form.imageUrl =res.data.imageUrl
      }
      const catIds = categories.find((cat) => cat.nome == form.categoria)
      console.log(catIds)
      form.variacao.nome = form.nomeVar
      form.variacao.variacoes = tagsCollection
      form.categoriaIds = [catIds.id]
      form.preco = parseFloat(form.preco)
      form.desconto = parseFloat(form.desconto)
      form.quantidade = parseInt(form.quantidade) 
    
      await axios.put(`http://localhost:8080/produtos/${product.id}`, form)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AdminLayout router={router}>
      <Container  sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", flex: 1, justifyContent: "center" }}
          >
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
              }}
              >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h4">Atualizar Produto</Typography>
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
                  margin="normal"
                  required
                  sx={{ width: "80%" }}
                  {...register("nome")}
                />

                <TextField
                  label="Descrição"
                  name="descricao"
                  multiline
                  minRows={3}
                  margin="normal"
                  required
                  sx={{ width: "80%" }}
                  {...register("descricao")}
                />

                <TextField
                  label="Preço"
                  name="preco"
                  type="number"
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
                  {...register("preco")}
                />
                <TextField
                  label="Desconto"
                  name="desconto"
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
                  {...register("desconto")}
                />

                <TextField
                  label="Quantidade"
                  name="quantidade"
                  type="number"
                  margin="normal"
                  required
                  InputProps={{
                    min: 0,
                    endAdornment: (
                      <Typography >Unidades</Typography>
                    ),
                  }}
                  sx={{ width: "80%" }}
                  {...register("quantidade")}
                />

                <TextField
                  label="Categoria"
                  name="categoria"
                  margin="normal"
                  required
                  select
                  helperText="Selecione uma categoria"
                  sx={{ width: "80%" }}
                  defaultValue={product.categorias[0].nome}
                  {...register("categoria")}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.nome}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Nome da variação"
                  name="nomeVar"
                  margin="normal"
                  required
                  sx={{ width: "20%" }}
                  {...register("nomeVar")}
                />

                <MultiValueInput
                    inputValue={tagsInput}
                    onInputChange={setTagsInput}
                  onAdd={setTagsCollection}
                  onDelete={setTagsCollection}
                  items={tagsCollection}
                />

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
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <FormControlLabel  name="FISICO" value="FISICO" control={<Radio />} label="Físico" />
                    <FormControlLabel  name="DIGITAL" value="DIGITAL" control={<Radio />} label="Digital" />
                  </RadioGroup>
                </FormControl>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "80%", marginLeft: 10 }}
                onClick={handleSubmit(handleSubmitForm)}
              >
                Atualizar Produto
              </Button>
              </Box>
            <CardMedia image={product.image} alt="Minha Imagem" sx={{ width:300, height: 300 }} />
            
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </AdminLayout>
  );
}
