import { TextField ,Button} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearError, userCreate } from '../../../redux/Reducer/User/UserReducer'

const CreateUserPage = () => {
    const { error, status } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [body, setBody] = useState({
        username: null,
        email: null,
        password : null,
    })
    const dispatch = useDispatch();
    const inputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBody({ ...body, [name]: value });
        dispatch(clearError());
    }
    const crtUser=() => {
        dispatch(userCreate(body));
        if (status === 200) {
            alert("Başari ile kayıt olundu");
            navigate("/login");
        }
    }
  return (
    <div>
          <form className='login-form'>
              <h1>Kayıt Ol</h1>
              <div  className='inputDiv'>
                  <TextField  onChange={inputChange} className='login-input' placeholder='Kullanici Adi giriniz *' name='username'></TextField>
              </div>
               <div className="invalid-feedback">
          {error?.validationErrors?.username}
        </div>
              <div className='inputDiv'>
                  <TextField onChange={inputChange} type='email' className='login-input' placeholder='Email Adresi*' name='email'></TextField>
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
              <Button onClick={crtUser} id='login-button' size='large' variant='contained'>
                  Kayıt
              </Button>
          </form>
    </div>
  )
}

export default CreateUserPage
