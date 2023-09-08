import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Snackbar } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLikes, removeLike } from '../redux/Reducer/Product/LikeReducer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../redux/Reducer/Product/CartReducer';

const CartListPage = ({ like }) => {
    const { id, admin, title, image, description, price } = like.product;
    const  email  = localStorage.getItem("email");
    const userIsLogin  = localStorage.getItem("userIsLogin");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const trimmedDescription = description.length > 35 ? `${description.slice(0, 33)}...` : description;
const trimmedTitle = description.length > 30 ? `${title.slice(0, 30)}...` : title;
    const [isRemoved, setIsRemoved] = useState(false);

    const sendDetailPage = () => {
        navigate(`/product/${id}`)
    }

    const deleteToCart = () => {
        dispatch(removeLike(like.id));
        localStorage.setItem(`isLike_${id + email}`, "false");
        
        setIsRemoved(true);
        const timeout = setTimeout(() => {
            dispatch(getLikes(like.user.email)); 
        }, 500)
        return () => clearTimeout(timeout);
        
    }
      const addBasket=() => {
          userIsLogin === "true" ? (
              dispatch(addToCart({ email, id })),
            alert("Sepete Eklendi")  
          )
              : alert("Lütfen giriş yapın")
          console.log(userIsLogin)
          
      }

    const handleSnackbarClose = () => {
        setIsRemoved(false);
    }
    return (
        <div id='products'>
            <Card id='product-card'>
                <div className='deleteDiv'>
    <IconButton onClick={deleteToCart} id='deleteCart'>
                    <ClearIcon color='warning'></ClearIcon>
                </IconButton>
                </div>
            
                <CardHeader
                    avatar={<Avatar>{admin.username.charAt(0)}</Avatar>}
                    title={admin.username}
                />
                <Button onClick={sendDetailPage}>
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
                    <Typography variant='h5'>{trimmedTitle}</Typography>
                    <br />
                    <Typography variant='h6'>
                        {trimmedDescription}
                    </Typography>
                    <br />
                    <Typography id='price' variant='body1'>{price} TL</Typography>
                </CardContent>
                <CardActions>
                    <div className='action-basket'>
                        <IconButton onClick={addBasket}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                        </IconButton>
                        
                    </div>
                </CardActions>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isRemoved}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Ürün Beğeni Listesinden Kaldırıldı"
            />
        </div>
    )
}

export default CartListPage;

