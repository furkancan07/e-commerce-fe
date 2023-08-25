import { Search } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar,TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { getSearchProductList } from '../redux/Reducer/Product/ProductReducer';
import { Link } from 'react-router-dom';





const TopBar = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const searchProduct=(event) => {
    event.preventDefault();
    const val = event.target.value;
    setValue(val);
    
  }
  useEffect(() => {
    if (value!="") {
        dispatch(getSearchProductList(value))
     }
  
  },[value])
  
  return (
    <Box sx={{
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
           <Button id="button-topbar" startIcon={<ShoppingCartIcon ></ShoppingCartIcon>}
              variant="text">
              <Link className='link' to="/orders"> Sepet </Link>
            
          </Button>

          </div>
           
          
         
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
