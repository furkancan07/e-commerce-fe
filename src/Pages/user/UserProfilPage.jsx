
import React, { useEffect, useState } from 'react'
import Login from '../auth/user/Login';
import {Button, Card, CardActions, CardContent, Container, IconButton, Typography } from '@mui/material';
;
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../api/server';


const UserProfilPage = () => {
  const userIsLogin = localStorage.getItem("userIsLogin");

  const { email } = useParams();
  const [user, setUser] = useState({
    id: null,
    username: null,
    email : email,
    adress: null,
    
  })
  
  const userGet=async() => {
    await getUser(email).then((res) => {
      setUser(res.data);
      return res.data;
    }).catch((err)=>{})
  }
  useEffect(() => {
    userGet();
  }, [])
  console.log(user);

    console.log(userIsLogin);
  return (
    <div id='profil'>
      <h1 id='center'>Bilgilerim</h1>
          {
        userIsLogin == "true" ? <div><Card 
          
        >
          <CardContent>
            <div id='content'>
              <Typography variant='h5'>Kullanıcı Adı :</Typography>
              <Typography>{user?.username}</Typography>
             
            </div>
             <div id='content'>
              <Typography variant='h5'>EPosta Adresi :</Typography>
              <Typography>{email}</Typography>
            </div>
          </CardContent>
          <CardActions>
             <div className='product-action'>
                <Link to={"/"}>AnaSayfa</Link>  
            </div>
             <div className='product-action'>
                <Link to={"/orders"}>Sepetim</Link>  
            </div>
            <div className='product-action'>
                <Link to={"/orders"}>Beğendiklerim</Link>  
                    </div>
         </CardActions>
          
        </Card></div> : <Login></Login>
          }
     
    </div>
  )
}

export default UserProfilPage
