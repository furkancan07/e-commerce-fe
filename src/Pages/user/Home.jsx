import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryProductList } from '../../redux/Reducer/Product/ProductReducer'
import { Box, Button, Toolbar } from '@mui/material'


const Home = () => {
  const { productList } = useSelector((store) => store.product)
const [category, setCategory] = useState("Teknoloji")
  
  
  const a = [];
  const dispatch = useDispatch();

  const changeCategory = (event) => {
    const name = event.target.name;
    setCategory(name);
  }
 
  
  useEffect(() => {
    dispatch(getCategoryProductList(category))
    console.log(category);
  },[category])
  return (

    <div>
      <div className='category-button-list'>
       <Button onClick={changeCategory} name='Teknoloji' variant='text'>Teknoloji</Button>
        <Button onClick={changeCategory} name='Spor' variant='text'>Spor</Button>
        <Button onClick={changeCategory} name='Giyim' variant='text'>Giyim</Button>
        <Button onClick={changeCategory} name='Kozmetik' variant='text'>Kozmetik</Button>
        <Button onClick={changeCategory} name='Cocuk' variant='text'>Çocuk</Button>
        <Button onClick={changeCategory} name='Market' variant='text'>SuperMarket</Button>
      </div>
      
        
     
      {
        productList.map((product, index) => {
          return <div key={index}>{product.title}</div>
        })
      }
    </div>
  )
}

export default Home
