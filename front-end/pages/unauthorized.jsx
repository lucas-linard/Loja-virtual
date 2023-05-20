import { Grid } from "@mui/material";
import Cookies from "js-cookie";


export default function Unauthorized() {
    Cookies.remove("jwt")
    return (
        <Grid container>
        <Grid item>
            <h1>Você não tem autorização 😢</h1>
            <h4>Caso seja um administrador e esteja vendo esta mensagem, entre em contato com a equipe de T.I 👍</h4>
        </Grid>
        </Grid>
    );
}