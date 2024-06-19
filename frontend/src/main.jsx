import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from './Layout.jsx';
import AboutUs from './components/about/AboutUs.jsx';
import ContactUs from './components/contact/ContactUs.jsx';
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import HomePage from './components/homepage/HomePage.jsx';
import Listpage from './components/listpage/Listpage.jsx';
import SinglePage from './components/singlepage/SinglePage.jsx';



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='about' element={<AboutUs/>}/>
      <Route path='contact' element={<ContactUs/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='list' element={<Listpage/>}/>
      <Route path=':id' element={<SinglePage/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
