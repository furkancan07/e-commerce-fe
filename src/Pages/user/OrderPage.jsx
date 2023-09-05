import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartToList } from '../../redux/Reducer/Product/CartReducer';
import CartListPage from '../../compenents/CartListPage';
import { Button } from '@mui/material';
import LoginPage from '../auth/user/Login';



const OrderPage = () => {
  const dispatch = useDispatch();
  const userIsLogin = localStorage.getItem("userIsLogin");
  const email = localStorage.getItem("email");
  const { cartProductList, totalPrice } = useSelector((store) => store.cart);
  useEffect(() => {
    dispatch(getCartToList(email));
  }, [])
  
  
 
  return (
    <div>
      {
        userIsLogin ?     <div className='orderDiv'>
        
 <div className='paymentDiv'>
      {
        cartProductList.map((cart, index) => {
          return <CartListPage key={index} cart={cart}/>
        })  
      }
    

      
      </div>

        <div className='paymentDiv' >
        <h2>Toplam Fiyat : {totalPrice} Tl</h2>
        <Button id='product-button' variant='contained'>Öde</Button>
      </div>

    </div> : <LoginPage></LoginPage>
      }
  
    </div>

   
   
  )
}

export default OrderPage
