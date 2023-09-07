import { Search } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar,TextField, Button, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchProductList } from '../redux/Reducer/Product/ProductReducer';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/Reducer/User/UserReducer';
import { aLogout } from '../redux/Reducer/Admin/AdminReducer';





const TopBar = () => {
  const [value, setValue] = useState();
  const { isLogin: adminLog } = useSelector((store) => store.admin);
  const { quantity } = useSelector((store) => store.cart);
  const username = localStorage.getItem("username");
  const isLogin = localStorage.getItem("isLogin");
  const { userIsLogin: userlog, email: eposta } = useSelector((store) => store.user);
  const userIsLogin = localStorage.getItem("userIsLogin");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  console.log(userIsLogin + " " + email);
  const dispatch = useDispatch();
  const searchProduct=(event) => {
    event.preventDefault();
    const val = event.target.value;
    setValue(val);
    navigate("/")
  }
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login")
  }
  const logoutAdmin=() => {
    dispatch(aLogout())
    navigate("/admin-login")
  }
  useEffect(() => {
    if (value!="") {
        dispatch(getSearchProductList(value))
     }
  
  }, [value,userlog,adminLog])
  // admin girişi
  
 

  
  return (
    <>
      
      {
      // admin giriş yapmışsa
        isLogin ? <Box sx={{
      backgroundColor: 'green',
      flexGrow: 1
    }}>
      <AppBar position='static'>
        <Toolbar className='toolbar'>
            <Link className='link' to="/"><h1>Admin Panel</h1></Link>
         
              <TextField onChange={searchProduct} id="filled-basic" label="Ara" variant="filled">
               
              </TextField>
               
              <div className='buttons-topbar'>          
            
                 <Button id="button-topbar" startIcon={<AddIcon ></AddIcon>}
              variant="text">
              <Link className='link' to="/productAdd"> Ürün Ekle </Link>
            
          </Button>
           
           <Button id="button-topbar" startIcon={<AttachMoneyIcon ></AttachMoneyIcon>}
              variant="text">
              <Link className='link' to="/adminProducts"> Ürünlerim </Link>
            
                </Button>
                 <Button  onClick={logoutAdmin} id="button-topbar" startIcon={<LogoutIcon ></LogoutIcon>}
              variant="text">
              Çıkıs Yap
            
          </Button>

          </div>
           
          
         
        </Toolbar>
      </AppBar>
        </Box> : // Kullanici giriş yapmışsa
          userIsLogin ? <Box sx={{
      backgroundColor: 'green',
      flexGrow: 1
    }}>
      <AppBar position='static'>
        <Toolbar className='toolbar'>
          <Link className='link' to="/"><h1>Rf</h1></Link>
          
                <TextField onChange={searchProduct} id="filled-basic" label="Ara" variant="filled" > 
                  </TextField>
               
          <div className='buttons-topbar'>
            <Button id="button-topbar" startIcon={<AccountCircleIcon></AccountCircleIcon>}
              variant="contained">
              <Link className='link' to={`/user/${email}`}> {email.split("@")[0]} </Link>
          </Button>
           <Button id="button-topbar" startIcon={<FavoriteIcon color='error'></FavoriteIcon>}
              variant="contained">
              <Link className='link' to="/likes">Beğeniler </Link>
            
                  </Button> 
                  
 
                  <Button id="button-topbar" startIcon={<ShoppingCartIcon >
                     
                </ShoppingCartIcon>}
                    variant="contained">
                  
              <Link className='link' to="/orders"> Sepet </Link>
            
                  </Button>
                  <Avatar sx={{
                    backgroundColor : 'black'
                  }} id='quantity'>{quantity }</Avatar> 
                  
                 
                 
                  
                  
           
                <Button onClick={logoutUser} id="button-topbar" startIcon={<LogoutIcon></LogoutIcon>}
              variant="text">
              <Link className='link'> Çıkış Yap </Link>
            
          </Button>

          </div>
           
          
         
        </Toolbar>
      </AppBar>
    </Box> : <Box sx={{
      backgroundColor: 'green',
      flexGrow: 1
    }}>
      <AppBar position='static'>
        <Toolbar className='toolbar'>
          <Link className='link' to="/"><h1>Rf</h1></Link>
          
          <TextField onChange={searchProduct}  id="filled-basic" label="Ara" variant="filled" /> 
          <div className='buttons-topbar'>
            <Button id="button-topbar" startIcon={<AccountCircleIcon></AccountCircleIcon>}
              variant="contained">
              <Link className='link' to="/login"> Giriş Yap </Link>
           
          </Button>
           <Button id="button-topbar" startIcon={<FavoriteIcon color='error'></FavoriteIcon>}
              variant="contained">
              <Link className='link' to="/likes">Beğeniler </Link>
             
          </Button>
           <Button  id="button-topbar" startIcon={<ShoppingCartIcon ></ShoppingCartIcon>}
              variant="text">
              <Link className='link' to="/orders"> Sepet </Link>
            
          </Button>

          </div>
        </Toolbar>
      </AppBar>
    </Box>}
    </>
    
  
  )
}

export default TopBar
