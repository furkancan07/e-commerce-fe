import { Search } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar,TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { getSearchProductList } from '../redux/Reducer/Product/ProductReducer';





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
          <h1>Rf</h1>
          <TextField onChange={searchProduct}  id="filled-basic" label="Ara" variant="filled" /> 
          <div className='buttons-topbar'>
            <Button id="button-topbar" startIcon={<AccountCircleIcon></AccountCircleIcon>}
            variant="contained">
             Giriş Yap
          </Button>
           <Button id="button-topbar" startIcon={<FavoriteIcon color='error'></FavoriteIcon>}
            variant="contained">
             Beğeniler
          </Button>
           <Button id="button-topbar" startIcon={<ShoppingCartIcon ></ShoppingCartIcon>}
            variant="text">
             Sepet
          </Button>

          </div>
           
          
         
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
