import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/user/Home'
import TopBar from './compenents/TopBar'
import Footer from './compenents/Footer'

import LİkePage from './Pages/user/LİkePage'
import OrderPage from './Pages/user/OrderPage'
import AdminSignUp from './Pages/auth/admin/AdminSignUp'



import AdminPanel from './Pages/admin/adminPanel'
import ProductAdd from './Pages/admin/ProductAdd'
import AdminProductPage from './Pages/admin/AdminProductPage'

import ProductDetailPage from './Pages/user/ProductDetailPage'

import UserProfilPage from './Pages/user/UserProfilPage'
import CreateUserPage from './Pages/auth/user/CreateUserPage'
import LoginPage from './Pages/auth/user/LoginPage'



function App() {


  return (
    <>
      <TopBar></TopBar>
      
  <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/likes' element={<LİkePage></LİkePage>}></Route>
        <Route path='/orders' element={<OrderPage></OrderPage>}></Route>
        <Route path='/admin-login' element={<AdminSignUp></AdminSignUp>}></Route>
        <Route path='/createuser' element={<CreateUserPage></CreateUserPage>}></Route>
        <Route path='/admin-panel' element={<AdminPanel></AdminPanel>} ></Route>
        <Route path='/productAdd' element={<ProductAdd></ProductAdd>} ></Route>
        <Route path='/adminProducts' element={<AdminProductPage></AdminProductPage>} ></Route>
       
        <Route path="/product/:id" element={<ProductDetailPage />} /> 
        <Route path="/user/:email" element={<UserProfilPage/>} /> 
      </Routes>
      
    
      <Footer></Footer>
    </>
  )
}

export default App
