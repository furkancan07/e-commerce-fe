import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/user/Home'
import TopBar from './compenents/TopBar'
import Footer from './compenents/Footer'

import LİkePage from './Pages/user/LİkePage'
import OrderPage from './Pages/user/OrderPage'
import AdminSignUp from './Pages/auth/admin/AdminSignUp'
import CreateUser from './Pages/auth/user/createUser'

import AdminPanel from './Pages/admin/adminPanel'
import ProductAdd from './Pages/admin/ProductAdd'
import AdminProductPage from './Pages/admin/AdminProductPage'
import AdminProfilPage from './Pages/admin/AdminProfilPage'
import ProductDetailPage from './Pages/user/ProductDetailPage'
import Login from './Pages/auth/user/Login'
import UserProfilPage from './Pages/user/UserProfilPage'


function App() {


  return (
    <>
      <TopBar></TopBar>
      
  <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/likes' element={<LİkePage></LİkePage>}></Route>
        <Route path='/orders' element={<OrderPage></OrderPage>}></Route>
        <Route path='/admin-login' element={<AdminSignUp></AdminSignUp>}></Route>
        <Route path='/createuser' element={<CreateUser></CreateUser>}></Route>
        <Route path='/admin-panel' element={<AdminPanel></AdminPanel>} ></Route>
        <Route path='/productAdd' element={<ProductAdd></ProductAdd>} ></Route>
        <Route path='/adminProducts' element={<AdminProductPage></AdminProductPage>} ></Route>
        <Route path='/admin-profil' element={<AdminProfilPage></AdminProfilPage>} ></Route>
        <Route path="/product/:id" element={<ProductDetailPage />} /> 
        <Route path="/user/:email" element={<UserProfilPage/>} /> 
      </Routes>
      
    
      <Footer></Footer>
    </>
  )
}

export default App
