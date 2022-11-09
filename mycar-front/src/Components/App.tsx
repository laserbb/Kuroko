import {useEffect, useState} from "react";
import {Country} from "../Models/Country";
import {Navigate, Route, Routes} from "react-router-dom";
import CarForm from "./CarForm";
import SignIn from "./SignIn";
import Registration from "./Registration";
import About from "./About";
import Search from "./Search";
import MainPage from "./MainPage";
import CarView from "./CarView";
import Profile from "./Profile";
import * as React from "react";

export default function App() {

  return (
    <Routes>
      <Route path='/login' element={<SignIn/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='' element={<MainPage/>} />

      {!!localStorage.getItem('token') ? (
        <>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/cars/create' element={<CarForm/>} />
          <Route path='/cars/view/:pk' element={<CarView/>} />
        </>

      ) : (
        <Route path="*" element={<Navigate to="/login" replace />}/>
      )}

      <Route path="*" element={<Navigate to="" replace />}/>



    </Routes>
  )
}
