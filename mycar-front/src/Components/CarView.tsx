import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import background from "../images/background.jpg";
import {Car, Country} from "../Models/Country";
import NavBar from "./NavBar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        My Car
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(
    { palette: { mode: 'dark' } }
);

export default function CarView() {
  let { pk } = useParams();
  const [car, setCar] = useState<Car>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1.0/cars/${pk}/`
        );
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        let actualData = await response.json();
        setCar(actualData);
        console.log(actualData)
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        console.log('f')
      }
    }
    fetchCountries()
  }, [])

  // @ts-ignore
  return (
    <ThemeProvider theme={theme}  >
      <CssBaseline/>
      <NavBar/>
      <main style={{backgroundImage: `url(${background})`}}>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{p: 2, textAlign: "center"}} alignItems="center" >
              <Box component="img" alt="The house from the offer." src={`${!!car ? car.cover : ''}`} alignItems="center"
                   sx={{height: 240, width: 360,
                     maxHeight: {xs: 240, md: 300}, maxWidth: {xs: 500, md: 500}}}
              />
            </Grid>
            <Grid item xs={9} sx={{pl: 2, pb: 2, pr: 2}}>
              <Typography component="h4" variant="h4" align="center" color="text.primary" sx={{pb: 3, py: 1}}>
                {!!car ? car.title : ''}
              </Typography>
              <Typography align="left" color="text.primary" sx={{px: 3,pt:1, maxHeight: {xs: 233, md: 167}}}>
                <strong>Description: </strong>{!!car ? car.desc : ''}
              </Typography>
              <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                <strong>Author: </strong>{!!car ? car.author.username : ''} ({!!car ? car.author.first_name : ''} {!!car ? car.author.last_name : ''})
              </Typography>
              <Typography align="left" color="text.primary" sx={{px: 3,maxHeight: {xs: 233, md: 167}}}>
                <strong>Brand: </strong>{!!car ? car.brand : ''}
              </Typography>
              <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                <strong>Category: </strong>{!!car ? car.category : ''}
              </Typography>
              <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                <strong>Country: </strong>{!!car ? car.countries.name : ''}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Container sx={{py: 8}} maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item key="1" xs={12} sm={12} md={12}>
              <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', p: 7}}>
                <Typography align="center" color="text.primary">
                  {!!car ? car.content : ''}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Copyright/>
      </Box>
    </ThemeProvider>
  );
}
