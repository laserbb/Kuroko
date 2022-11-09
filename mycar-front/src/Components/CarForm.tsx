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
import {Category, Country, Brand} from "../Models/Country";
import NavBar from "./NavBar";
import TextField from "@mui/material/TextField";
import {MouseEventHandler, useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
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

export default function CarForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [countries, setCountries] = useState(Array<Country>());
  const [country, setCountry] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [brand, setBrand] = useState(undefined);
  const [cover, setCover] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  async function handleSubmit() {
    try {
      const form = new FormData();
      // @ts-ignore
      form.append("cover", cover);
      form.append("title", title);
      form.append("desc", description);
      // @ts-ignore
      form.append("countries", country);
      // @ts-ignore
      form.append("category", category);
      form.append("content", content);
      // @ts-ignore
      form.append("cover", cover);
      // @ts-ignore
      form.append("brand", brand);
      const response = await fetch(`http://127.0.0.1:8000/api/v1.0/cars/create/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
        body: form,
      });
      const json = await response.json();
      if(response.status==201){
        alert('Успешно создано!')
        navigate('/')
      }else{
        alert(JSON.stringify(json))
      }
    } catch (e) {
      console.log("error", e);
    }
  }

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar/>
      <main style={{backgroundImage: `url(${background})`}}>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Add my car
            </Typography>
          </Container>
        </Box>
        <Container sx={{py: 8}} maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item key="1" xs={12} sm={12} md={12}>
              <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', p: 7}}>
                <TextField margin="normal" required fullWidth label="Name" size="small" onChange={
                  (value) => setTitle(value.target.value)
                }/>
                <TextField margin="normal" required fullWidth label="Description" size="small" onChange={
                  (value) => setDescription(value.target.value)
                }/>
                <FormControl fullWidth margin="normal" required size="small">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select"
                          value={country} label="Age" onChange={changeCountry}>
                    {countries.map((country) => (
                        <MenuItem value={`${country.id}`}>{country.name}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required size="small">
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
                <FormControl fullWidth margin="normal" required size="small">
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
                <TextField multiline margin="normal" required fullWidth label="Текст" size="small" onChange={
                  (value) => setContent(value.target.value)
                }/>
                <input required style={{display: 'none'}} id="raised-button-file" type="file" name="file"
                       onChange={(event) => {
                         if (!!event.target.files) {
                           setCover(event.target.files[0]);
                         }
                       }}/>
                <label htmlFor="raised-button-file">
                  <Button fullWidth variant="outlined" component="span" sx={{mt: 1}}>Загрузить обложку </Button>
                </label>
                <Button fullWidth onClick={handleSubmit} variant="outlined" component="span" sx={{mt: 1}} >Отправить</Button>
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
