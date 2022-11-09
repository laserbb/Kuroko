import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {blue} from '@mui/material/colors';
import background from "../images/background.jpg";
import {useNavigate} from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        My car
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(

);

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState<File>();
  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1.0/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
      const json = await response.json();
      if(response.status==200){
        localStorage.setItem('token', json.token)
        navigate('/');
      } else{
        alert("Не правильный пароль")
      }
    } catch (e) {
      console.log("error", e);
    }

  };

  // @ts-ignore
  return<ThemeProvider theme={theme}>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: '100vh',backgroundImage: `url(${background})`}}
    >

      <Grid item xs={3} sx={{boxShadow: 5, backgroundColor: 'white'}}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{m: 1, bgcolor: blue[500]}}>
              <DirectionsCarIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Войти в аккаунт
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
              <TextField margin="normal" required fullWidth name="username" label="Логин"
                         size="small" onChange={
                (value) => setUsername(value.target.value)
              }/>
              <TextField margin="normal" required fullWidth name="password" label="Пароль" type="password"
                         size="small" onChange={
                (value) => setPassword(value.target.value)
              }/>
              <Button type="submit" fullWidth variant="contained" sx={{mt: 2, mb: 2}}>Войти </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"> Нужна помощь? </Link>
                </Grid>
                <Grid item>
                  <Link href="/registration" variant="body2"> Регистрация</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{mt: 6, mb: 4}}/>
        </Container>
      </Grid>

    </Grid>
  </ThemeProvider>;
}
