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

export default function About() {
  return (
    <ThemeProvider theme={theme}  >
      <CssBaseline/>
      <NavBar/>
      <main style={{backgroundImage: `url(${background})`}}>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              About us
            </Typography>
          </Container>
        </Box>
        <Container sx={{py: 8}} maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item key="1" xs={12} sm={12} md={12}>
              <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', p: 7}}>
                <Typography component="h4" variant="h4" align="center" color="text.primary">
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="text.primary">
                  Automated driving, electro-mobility, on-demand mobility and connectivity-mobility have never been so fascinating – and automobile advancement never so exciting and promising – as it is today. The international website, we would like to create a platform that brings you closer to this fascination and the latest technological trends. With content focusing on topics like mobility, stories of past and recent milestones, facts about historic, recent and future car models.

                </Typography>
                <Typography component="h5" variant="h5" align="center" color="text.primary">
                  Dive into these new worlds with us, get inspired, and experience something new, unusual and helpful every day. At MyCar – our digital interpretation of the sheer pleasure of driving.
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
