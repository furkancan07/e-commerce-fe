import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/user/Home'
import TopBar from './compenents/TopBar'
import Footer from './compenents/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopBar></TopBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
