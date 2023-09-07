import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Container, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

import {Button} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProductAdmin, removeProduct, upProduct } from '../redux/Reducer/Product/ProductReducer';



const AdminProductsList = ({ product }) => {
    const { id, admin, title, image, description, price, category } = product;
    const { status,error }=useSelector((store) => store.product);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [body, setBody] = useState({
        title: title,
        description: description,
        price : price,
    })
    const [edit, setEdit] = useState(false);
     const [isRemoved, setIsRemoved] = useState(false);
    const trimmedDescription = description.length > 35 ? `${description.slice(0, 33)}...` : description;
   const username = localStorage.getItem("username");
    const delProduct = () => {
        setIsRemoved(true);
        dispatch(removeProduct(id));
        const timeout = setTimeout(() => {
            dispatch(getProductAdmin(username));
        }, 500)
        return () => clearTimeout(timeout);
    }
    const sendDetailPage = () => {
        navigate(`/product/${id}`)
    }
     const handleSnackbarClose = () => {
        setIsRemoved(false);
    }
    const offEditMode=() => {
        setEdit(false);
    }
    const onEditMode=() => {
        setEdit(true);
    }
    const inputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBody({ ...body, [name]: value })
        dispatch(clearError());
      
    }
    const editProduct=async() => {
        await dispatch(upProduct({ id, body })) 
        if (status === 200) {
            dispatch(getProductAdmin(username));
            alert("Ürün Güncellendi");
            setEdit(false);
        }
    }
    return (
        <div id='products'>   
 <Card id='product-card'>
                <CardHeader
                    avatar={<Avatar>{admin.username.charAt(0)}</Avatar>}
                    title={admin.username}
                />
                {
                    edit ? <CardContent>
                         <Container id='form-container'>
                      <TextField  onChange={inputChange} defaultValue={title} label="Başlık" name='title'></TextField>
                        </Container>
                           <div className="invalid-feedback">
          {error.validationErrors?.title}
        </div>
                        <br />
                         <Container id='form-container'>
                     
                            <TextField onChange={inputChange} defaultValue={description} label="Açıklama" name='description'  multiline
        rows={4} 
                          sx={{ maxHeight: 200, width: 330, overflow: 'auto' }}  ></TextField>
                 
                        </Container>
                           <div className="invalid-feedback">
          {error.validationErrors?.description}
        </div>
                         <br />
                        
                          <Container id='form-container'>
                      
                      <TextField onChange={inputChange} defaultValue={price} label="Fiyat" type='number' name='price'></TextField>
                        </Container>
                       
                         <Container id='form-container'>
                      
                      
                        </Container>
                        
                    </CardContent>: <> <Button onClick={sendDetailPage}>
          {image && image.includes('image') ?
           
                    <CardMedia
                        component="img"
                        height={220}
                        image={image}
                        alt=""
                        sx={{
                            objectFit: 'contain',
                        }}
                    /> : image && image.includes('video') ?
                        <video height={217} width='100%' controls>
                            <source src={image} type="video/mp4" />
                        </video> : null
                }  
</Button>
          
                <CardContent>
                    <Typography variant='h5'>{title}</Typography>
            <br />
            <Typography variant='h6'>
{trimmedDescription}
            </Typography>
            
                    <br />
                    <Typography id='price' variant='body1'>{price} TL</Typography>
                </CardContent></>
                    
}
               
                <CardActions id='action'>
                    <div className='product-action'>
                        <IconButton onClick={edit ? offEditMode : onEditMode}>
                            <EditIcon></EditIcon>
                        </IconButton >
                        <Typography>{edit ? "İptal" : "Düzenle" }</Typography>
                    </div>
                   
                    <div className='product-action'>
                        <IconButton onClick={edit ? editProduct : delProduct} >
                            {edit ? <DoneIcon></DoneIcon>:
                            <DeleteIcon></DeleteIcon>
                            }
                            
                        </IconButton>
                        <Typography>{edit ? "Tamam" : "Sil" }</Typography>
                    </div>
                </CardActions>
            </Card>
             <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isRemoved}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Ürün  Kaldırıldı"
            />
        </div>
    )
}
export default AdminProductsList;
