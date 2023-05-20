import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
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



export default function SignIn() {
  const router = useRouter()
  const JWT = Cookies.get("jwt");

  const { register, handleSubmit, formState: { errors } } = useForm();

  function handleAuthorityRedirect(user) {
    if (user.authorities === "ROLE_ADMIN") {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  if (JWT) {
    const decoded = jwt_decode(JWT);
    handleAuthorityRedirect(decoded);
  }


  const handleSignIn = async (form) => {
    console.log(form);
    try {
      const res = await axios.post("http://localhost:8080/login", {
        "username": form.email,
        "password": form.password
      });

      let JWT = res.headers.authorization.split(" ")[1];
      const decoded = jwt_decode(JWT);

      Cookies.set("jwt", JWT, { expires: decoded.exp });
      handleAuthorityRedirect(decoded);

    } catch (error) {
      alert("Usuario ou senha incorretos")
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: true })}
              error={errors.email ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              error={errors.password ? true : false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit(handleSignIn)}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}