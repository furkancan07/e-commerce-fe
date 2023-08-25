import { TextField ,Button} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        
          <form className='login-form'>
                <h1>Giriş Yap</h1>
              <div className='inputDiv'>
                  <TextField className='login-input' placeholder='Email Adresi*' name='email'></TextField>
              </div>
              <div className='inputDiv'>
                  <TextField type='password' className='login-input' placeholder='Şifre*' name='şifre'></TextField>
              </div>
              <Button id='login-button' size='large' variant='contained'>Giriş</Button>
              <div className='link-div'>
                  <Link to="/createuser" className='link-login'>Kayıt Ol</Link>
                  <Link to="/admin-login" className='link-login'>Mağaza Girişi</Link>
              <Link className='link-login'>Şifremi Unuttum</Link>
              </div>
              
          </form>
    </div>
  )
}

export default Login
