import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAdmin } from '../../redux/Reducer/Product/ProductReducer';
import LoginPage from '../auth/user/Login';
import ProductsPage from '../../compenents/ProductsPage';
import AdminProductsList from '../../compenents/AdminProductsList';
import Loading from '../../compenents/Loading';




const AdminProductPage = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const isLogin = localStorage.getItem("isLogin");
  const { productList } = useSelector((store) => store.product);
  
 
  useEffect(() => {
    dispatch(getProductAdmin(username));

  },[])
  return (
    <div>
      {
        
        isLogin ? <div><h1>Ürünlerim</h1>
           
          {
            productList.map((product, index) => {
              return <AdminProductsList product={product} key={index}></AdminProductsList>
            }) 
          }
          
        </div> : <LoginPage></LoginPage>
      }
      
    </div>
  )
}

export default AdminProductPage
