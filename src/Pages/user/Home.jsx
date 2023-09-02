import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryProductList } from '../../redux/Reducer/Product/ProductReducer'
import { Box, Button, Toolbar } from '@mui/material'
import ProductsPage from '../../compenents/ProductsPage'


const Home = () => {
  const { productList } = useSelector((store) => store.product)
const [category, setCategory] = useState("Teknoloji")
  
  
  
  const dispatch = useDispatch();

  const changeCategory = (event) => {
    const name = event.target.name;
    setCategory(name);
  }
 
  
  useEffect(() => {
    dispatch(getCategoryProductList(category))
    console.log(category);
  }, [category])
  useEffect(() => {
    dispatch(getCategoryProductList(category))
    
  }, [])
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
      <div id='products'>
        {
        productList.map((product, index) => {
          return <ProductsPage key={index} product={product}></ProductsPage>
        })
      }
      </div>
      
    </div>
  )
}

export default Home
