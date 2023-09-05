import { TextField ,Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../redux/Reducer/User/UserReducer'

const LoginPage = () => {
  const { error, username, email } = useSelector((store) => store.user);
  const userIsLogin = localStorage.getItem("userIsLogin");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    email: null,
    password : null,
  })
  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBody({ ...body, [name]: value });
  }
  const login = () => {
    setDisabled(true);
    const creds = {
      email: body.email,
      password: body.password,
    }
    dispatch(loginUser(creds));
    
  }
  useEffect(() => {
    console.log(userIsLogin);
    if (userIsLogin === "true") {
      navigate("/");
    }
    else {
      const timeout = setTimeout(() => {
        setDisabled(false);
      }, 1000);
      return () => clearTimeout(timeout);
      
    }
},[userIsLogin,disabled])
  return (
    <div>
        
          <form className='login-form'>
                <h1>Giriş Yap</h1>
              <div className='inputDiv'>
                  <TextField onChange={inputChange} className='login-input' placeholder='Email Adresi*' name='email'></TextField>
        </div>
        <div className="invalid-feedback">
          {error?.validationErrors?.email}
        </div>
              <div className='inputDiv'>
                  <TextField onChange={inputChange} type='password' className='login-input' placeholder='Şifre*' name='password'></TextField>
        </div>
         <div className="invalid-feedback">
          {error?.validationErrors?.password}
        </div>
        {disabled ? <Button  disabled id='login-button' size='large' variant='contained'>Yükleniyor...</Button>
          : <Button  onClick={login} id='login-button' size='large' variant='contained'>Giriş</Button>}
              
              <div className='link-div'>
                  <Link to="/createuser" className='link-login'>Kayıt Ol</Link>
                  <Link to="/admin-login" className='link-login'>Mağaza Girişi</Link>
              <Link className='link-login'>Şifremi Unuttum</Link>
              </div>
              
          </form>
    </div>
  )
}

export default LoginPage
