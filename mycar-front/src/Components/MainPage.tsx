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
import {Country} from "../Models/Country";
import NavBar from "./NavBar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        My car
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(
    { palette: { mode: 'dark' } }
);

export default function MainPage() {
  const [data, setData] = useState(Array<Country>());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1.0/country/`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        console.log(actualData)
        setError(null);
      } catch(err) {
        // @ts-ignore
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [])

  async function randomCar() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1.0/cars/search/`
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      navigate(`/cars/view/${actualData[Math.floor(Math.random() * actualData.length)].id}`)
      setError(null);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}  >
      <CssBaseline/>
      <NavBar/>
      <main style={{backgroundImage: `url(${background})`}}>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Welcome to MyCar
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Here you can learn about famous cars and share your car to the whole world!
            </Typography>
            <Stack sx={{pt: 4}} direction="row" spacing={2} justifyContent="center">
              <Link href="/cars/create">
                <Button variant="contained">Add my car</Button>
              </Link>
              <Link href="/search">
                <Button variant="outlined">Search by filters</Button>
              </Link>
              <Button variant="outlined" onClick={randomCar}>Random Car</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{py: 8}} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card: Country) => (
              <Grid item key={`${card.id}`} xs={12} sm={6} md={3}>
                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>

                  <CardActions>
                    <Link href = {`/search?countries=${card.id}`}>
                      <Button size="small">{`${card.name}`}</Button>
                    </Link>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Copyright/>
      </Box>
    </ThemeProvider>
  );
}
