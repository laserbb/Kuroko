import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  function signOut() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <AppBar position="relative">
    <Toolbar sx={{justifyContent: "space-between"}}>
      <Stack direction="row" justifyContent="start">
        <DirectionsCarIcon sx={{mr: 2, width: 30}}/>
        <Typography sx={{mr: 2}} variant="h6" color="inherit" noWrap>My Car</Typography>
        <Link href="/">
          <Button sx={{color: 'white', flex: 1}}>Main</Button>
        </Link>
        <Link href="/about">
          <Button sx={{color: 'white', flex: 1}}>About</Button>
        </Link>
      </Stack>
      <Stack direction="row" justifyContent="end">
        {!!localStorage.getItem('token') ? (
          <>
            <Link href="/profile">
              <Button sx={{color: 'white', flex: 1}}>My profile</Button>
            </Link>
            <Button sx={{color: 'white', flex: 1}} onClick={signOut}>Log out</Button>
          </>
        ):(
          <>
            <Link href="/login">
              <Button sx={{color: 'white', flex: 1}}>log in</Button>
            </Link>
            <Link href="/registration">
              <Button sx={{color: 'white', flex: 1}}>Registration</Button>
            </Link>
          </>
        )}
      </Stack>
    </Toolbar>
  </AppBar>
  )
}
