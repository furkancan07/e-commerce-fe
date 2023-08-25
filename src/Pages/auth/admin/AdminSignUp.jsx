import { TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { aLogin, clearError } from '../../../redux/Reducer/Admin/AdminReducer';

const AdminSignUp = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [body, setBody] = useState({
    username: null,
    password: null,
  });
  const { username, isLogin, error } = useSelector((store) => store.admin);
  const navigate = useNavigate();

  const inputChange = (event) => {
    dispatch(clearError());
    const value = event.target.value;
    const name = event.target.name;
    setBody({ ...body, [name]: value });
  };

  const login = () => {
    setDisabled(true);
    const creds = {
      username: body.username,
      password: body.password,
    };

    dispatch(aLogin(creds));
  };

 
  useEffect(() => {
    if (isLogin === true) {
      navigate('/admin-panel');
    } else {
      const timeout = setTimeout(() => {
        setDisabled(false);
      }, 1000);

      
      return () => clearTimeout(timeout);
    }
  }, [isLogin,disabled]);

  return (
    <div>
      <form className='login-form'>
        <h1>Giriş Yap</h1>

        <div className='inputDiv'>
          <TextField
            onChange={inputChange}
            className='login-input'
            placeholder='Admin Adi *'
            name='username'
          ></TextField>
        </div>
        <div className="invalid-feedback">
          {error.username}
        </div>
        <div className='inputDiv'>
          <TextField
            onChange={inputChange}
            type='password'
            className='login-input'
            placeholder='Şifre*'
            name='password'
          ></TextField>
        </div>
        <div className="invalid-feedback">
          {error.password}
        </div>
        {disabled ? (
          <Button id='login-button' size='large' variant='contained' disabled>
            Yükleniyor...
          </Button>
        ) : (
          <Button
            onClick={login}
            id='login-button'
            size='large'
            variant='contained'
          >
            Giriş
          </Button>
        )}

        <div className='link-div'>
          <Link to="/login" className='link-login'>Kullanici Girişi</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminSignUp;