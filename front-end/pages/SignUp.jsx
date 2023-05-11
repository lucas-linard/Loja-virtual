import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()
  const JWT = Cookies.get("jwt");

  function handleAuthorityRedirect(user) {
    if (user.authorities === "ROLE_ADMIN") {
      router.push("/admin/category")
    } else {
      router.push("/")
    }
  }

  if (JWT) {
    const decoded = jwt_decode(JWT);
    handleAuthorityRedirect(decoded);
  }

  const handleSignIn = async (form) => {
    try {
      const registerAccountRequest = await axios.post("http://localhost:8080/register", {
        "username": form.email,
        "password": form.password
      });

      if(registerAccountRequest.status === 201){
        //dar sign para pegar o token e redirecionar para a pagina do usuario
        const tokenRequest = await axios.post("http://localhost:8080/login", {
          "username": form.email,
          "password": form.password
        });
        
        let JWT = tokenRequest.headers.authorization.split(" ")[1];
         const decoded = jwt_decode(JWT);
  
         Cookies.set("jwt", JWT, { expires: decoded.exp });
         handleAuthorityRedirect(decoded);
      }
    } catch (error) {
      enqueueSnackbar('Houve um problema ao criar o novo usuário. \n Verifique se o email já está cadastrado.', { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true, 
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  error={errors.email ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                  error={errors.password ? true : false}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(handleSignIn)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}