import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from "./Components/SignIn";
// @ts-ignore
import Registration from "./Components/Registration";
import MainPage from "./Components/MainPage";
import About from "./Components/About";
import Search from "./Components/Search";
import {BrowserRouter, Navigate, Route, Router, Routes} from 'react-router-dom';
import CarForm from "./Components/CarForm";
import App from "./Components/App";


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root'),
);
