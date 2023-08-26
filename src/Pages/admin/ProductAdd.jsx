import { Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addProduct, clearError } from '../../redux/Reducer/Product/ProductReducer';



const ProductAdd = () => {
    const { username, isLogin } = useSelector((store) => store.admin);
    const { error, status } = useSelector((store) => store.product)
  const [disabled, setDisabled] = useState(false);
  const [selectedImage, setImage] = useState();
    const [bodies, setBodies] = useState({
        title: null,
        description: null,
        image: null,
        categoryName: null,
        price : 0,
        
    });
    const dispatch = useDispatch();


    const inputChange = (event) => {
    const value = event.target.value;
        const name = event.target.name;
        
        setBodies({ ...bodies, [name]: value });
        dispatch(clearError())
        
        
  };
   const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    }
    fileReader.readAsDataURL(file);
    
  }
    const productAdd = () => {
      setDisabled(true);
      const body = {
        title: bodies.title,
        description: bodies.description,
        image: selectedImage,
        categoryName: bodies.categoryName,
        price : bodies.price,
      }
      
      
     
        dispatch(addProduct({ username, body }))
       
  }
 
    useEffect(() => {
         if (status === 200) {
           alert('Ürün Başarıyla Eklendi')
         } else {
             const timeout = setTimeout(() => {
                 setDisabled(false)
             },1000)
        }
        
    },[status,disabled])
  return (
    <div>
          {isLogin ?
              <form className='product-form' >
                  <h1 id='title'>Rf</h1>
                  <h3 id='title'>Ürün Ekle</h3>
                  <Container id='form-container'>
                      <label ><h3>Başlık</h3> </label>
                      <TextField onChange={inputChange} name='title'></TextField>
                  </Container>
                  <div className="invalid-feedback">
          {error.validationErrors?.title}
        </div>
                    <Container id='form-container'>
                      <label ><h3>Açıklama</h3></label>
                      <TextField onChange={inputChange} name='description'  multiline
        rows={4} 
                          sx={{ maxHeight: 200, overflow: 'auto' }}  ></TextField>
                      <div className="invalid-feedback">
          {error.validationErrors?.description}
        </div>
                  </Container>
                    <Container id='form-container'>
                      <label ><h3>Kategori</h3></label>
                      <TextField onChange={inputChange} name='categoryName'></TextField>
                  </Container>
                   <div className="invalid-feedback">
          {error.mesage}
        </div>
                   <Container id='form-container'>
                      <label ><h3>Fiyat</h3></label>
                      <TextField type='number' onChange={inputChange} name='price'></TextField>
                  </Container>
                    <Container id='form-container'>
                      <label ><h3>Resim</h3></label>
                      <input onChange={handleChangeImage} name='image' type='file'></input>
                  </Container>
                   {disabled ? (
          <Button id='product-button' size='large' variant='contained' disabled>
            Yükleniyor...
          </Button>
        ) : (
          <Button disabled={disabled} onClick={productAdd} id='product-button'  variant='contained'>Ürünü Ekle</Button>
        )}
                 
                  
          </form> :
              <Link to="/admin-login">Bu Sayfayi Görüntüleme Yetkiniz Yok Giriş Yap</Link>}
    </div>
  )
}

export default ProductAdd
