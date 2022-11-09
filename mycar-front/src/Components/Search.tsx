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
import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useParams, useSearchParams} from "react-router-dom";

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

export default function Search() {
  const [data, setData] = useState(Array<Car>());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState(Array<Country>());
  const [country, setCountry] = useState(undefined);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(undefined);
  const [brand, setBrand] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      if(!!searchParams.get("countries")){
        // @ts-ignore
        setCountry(searchParams.get("countries"))
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1.0/cars/search/?a=b${!!searchParams.get("countries") ? "&countries=" + searchParams.get("countries") : ''}`
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
      } catch (err) {
        // @ts-ignore
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [])

  const changeCountry = async (event: SelectChangeEvent<Country>) => {
    event.preventDefault();
    // @ts-ignore
    setCountry(Number(event.target.value))
  };
  const changeCategory = async (event: SelectChangeEvent<String>) => {
    event.preventDefault();
    // @ts-ignore
    setCategory(event.target.value)
  };
  const changeBrand = async (event: SelectChangeEvent<String>) => {
    event.preventDefault();
    // @ts-ignore
    setBrand(event.target.value)
  };

  useEffect(() => {
    const fetchCountries = async () => {
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
        setCountries(actualData);
        console.log(actualData)
        setError(null);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries()
  }, [])

  async function handleSubmit() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1.0/cars/search/?a=b${!!search ? "&search=" + search : ''}${!!country ? "&countries=" + country : ''}${!!category ? "&category=" + category : ''}${!!brand ? "&brand=" + brand : ''}${!!searchParams.get("countries") ? "&countries=" + searchParams.get("countries") : ''}`
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
    } catch (err) {
      // @ts-ignore
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar/>
      <main style={{backgroundImage: `url(${background})`}}>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Поиск
            </Typography>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select"
                      value={country} label="Age" onChange={changeCountry}>
                    {countries.map((country) => (
                        <MenuItem value={`${country.id}`}>{country.name}</MenuItem>
                    ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select"
                      value={category} label="Category" onChange={changeCategory}>
                <MenuItem value="sedan">Sedan</MenuItem>
                <MenuItem value="coupe">Coupe</MenuItem>
                <MenuItem value="sport">Sport</MenuItem>
                <MenuItem value="hatchback">Hatchback</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
                <MenuItem value="crossover">Crossover</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select"
                      value={brand} label="Brand" onChange={changeBrand}>
                <MenuItem value="bmw">BMW</MenuItem>
                    <MenuItem value="audi">Audi</MenuItem>
                    <MenuItem value="mitsubishi">MITSUBISHI</MenuItem>
                    <MenuItem value="porsche">PORSCHE</MenuItem>
                    <MenuItem value="volkswagen">VOLKSWAGEN</MenuItem>
                    <MenuItem value="kia">KIA</MenuItem>
                    <MenuItem value="hyundai">Hyundai</MenuItem>
                    <MenuItem value="toyota">Toyota</MenuItem>
                  <MenuItem value="ferarri">Ferarri</MenuItem>
                    <MenuItem value="tesla">Tesla</MenuItem>
                <MenuItem value="lada">Lada</MenuItem>
                    <MenuItem value="jac">JAC</MenuItem>
              </Select>
            </FormControl>
            <TextField margin="normal" fullWidth name="Поиск" label="Поиск" size="small" onChange={
              (value) => setSearch(value.target.value)
            }/>
            <Button fullWidth onClick={handleSubmit} variant="outlined" component="span" sx={{mt: 1}}>Найти</Button>
          </Container>
        </Box>
        <Container sx={{py: 8}} maxWidth="xl">
          <Grid container spacing={4}>
            {data.map((car: Car) => (
              <Grid item key="1" xs={12} sm={12} md={12}>
                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', p: 3}}>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sx={{p: 2, textAlign: "center"}} alignItems="center">
                      <Box component="img" alt="The house from the offer." src={`${car.cover}`} alignItems="center"
                           sx={{height: 240, width: 360,
                     maxHeight: {xs: 240, md: 300}, maxWidth: {xs: 500, md: 500}}}
                      />
                    </Grid>
                    <Grid item xs={9} sx={{pl: 2, pb: 2, pr: 2}}>
                      <Typography component="h4" variant="h4" align="center" color="text.primary" sx={{pb: 3, py: 1}}>
                        {car.title}
                      </Typography>
                      <Typography align="left" color="text.primary" sx={{px: 3, pt: 1, maxHeight: {xs: 233, md: 167}}}>
                        <strong>Description: </strong>{car.desc}
                      </Typography>
                      <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                        <strong>Author: </strong>{car.author.username} ({car.author.first_name} {car.author.last_name})
                      </Typography>
                      <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                        <strong>Brand: </strong>{car.brand}
                      </Typography>
                      <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                        <strong>Category: </strong>{car.category}
                      </Typography>
                      <Typography align="left" color="text.primary" sx={{px: 3, maxHeight: {xs: 233, md: 167}}}>
                        <strong>Country: </strong>{car.countries.name}
                      </Typography>
                      <CardActions>
                        <Grid container justifyContent="flex-end">
                          <Link href={`/cars/view/${car.id}`}>
                            <Button size="medium">More</Button>
                          </Link>

                        </Grid>
                      </CardActions>
                    </Grid>

                  </Grid>
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
