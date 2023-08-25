import { TextField ,Button} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CreateUser = () => {
  return (
    <div>
        
          <form className='login-form'>
              <h1>Kayıt Ol</h1>
              <div  className='inputDiv'>
                  <TextField  className='login-input' placeholder='Kullanici Adi giriniz *' name='Kullanici Adi'></TextField>
              </div>
              <div className='inputDiv'>
                  <TextField type='email' className='login-input' placeholder='Email Adresi*' name='email'></TextField>
              </div>
              <div className='inputDiv'>
                  <TextField type='password' className='login-input' placeholder='Şifre*' name='şifre'></TextField>
              </div>
              <Button id='login-button' size='large' variant='contained'>
                  <Link className='link-create'  to="/login" >Kayıt</Link>
              </Button>
             
              
          </form>
    </div>
  )
}

export default CreateUser
