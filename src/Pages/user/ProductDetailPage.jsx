import React, { useEffect } from 'react'
import { getProduct } from '../../api/server'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/Reducer/Product/CartReducer';
import { createComment, getComments } from '../../redux/Reducer/Product/CommentReducer';
import store from '../../redux/store';
import CommentListPage from '../../compenents/CommentListPage';
import { Send } from '@mui/icons-material';
import { addLike, removeLike } from '../../redux/Reducer/Product/LikeReducer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(true);
  const [product, setProduct] = useState({});
  const { title, description, admin, image, category, price } = product;
  const email = localStorage.getItem("email");
  const userIsLogin = localStorage.getItem("userIsLogin");
  const { commentList,status } = useSelector((store) => store.comment);
  const [isComment, setIsComment] = useState(true);
  const [body, setBody] = useState({
    content :null,
  })
    const [isLike, setisLike] = useState(()=>{
         return localStorage.getItem(`isLike_${id+email}`) || 'false';
    })
  const dispatch = useDispatch();
  const getProductDetail=async() => {
    try {
      var response = await getProduct(id);
      //console.log(response.data);
      setProduct(response.data);
      console.log(product);
      return response;
    } catch (error) {
      throw error;
    }
  }
  const inputChange = (event) => {
    setDisabled(false);
    const name = event.target.name;
    const value = event.target.value;
    setBody({ ...body, [name]: value })
    if (value === "") {
      setDisabled(true)
    }
  }
  const commentAdd=() => {
    dispatch(createComment({ email, id, body }))
    setTimeout(() => {
     alert("Yorum Eklendi")
    window.location.reload(); // Reload the page
  }, 500);
    
    
  }
  const offComment=() => {
    setIsComment(false);
  }
  const onComment=() => {
    setIsComment(true);
    dispatch(getComments(id))
   
  }
    const alertLogin=() => {
        alert("Beğenmek için lütfen giriş yapın");
    }
  const addBasket=() => {
     userIsLogin === "true" ? (
            dispatch(addToCart({email,id})),
            alert("sepete eklendi")
        )
             : alert("sepete eklemek için lütfen giriş yapın")   
  }
  const onLike = () => {
        setisLike("true")
        localStorage.setItem(`isLike_${id+email}`, 'true')
        dispatch(addLike({ id, email }));
        
    }
    const offLike = () => {
      setisLike("false");
        localStorage.setItem(`isLike_${id+email}`, 'false')
        dispatch(removeLike(id));
    }
  useEffect(() => {
    getProductDetail();
    dispatch(getComments(id))
  }, [])

  
  return (
    <div>
         {
         <Card >
                <CardHeader
            avatar={<Avatar>{admin?.username.charAt(0)}</Avatar>}
          title={admin?.username}    
                />
                {image && image.includes('image') ?
                    <CardMedia
                        component="img"
                        height={400}
                        image={image}
                        alt=""
                        sx={{
                            objectFit: 'contain',
                        }}
                    /> : image && image.includes('video') ?
                        <video height={700} width='100%' controls>
                            <source src={image} type="video/mp4" />
                        </video> : null
                }
                <CardContent>
          <Typography variant='h5'>{title}</Typography>
          <Typography variant='body2'>{category?.name}</Typography>
                    <br />
            <pre>
              <Typography variant='h6'>{description}</Typography>
              </pre>
                    <br />
                    <Typography id='price' variant='body1'>{price} TL</Typography>
          </CardContent>
          {userIsLogin ? <CardActions id='action'>
                      <div className='product-action'>
                        <IconButton onClick={userIsLogin ?  isLike==="true" ? offLike : onLike : alertLogin}>
                            <FavoriteIcon color={isLike==="true" ? "warning" : "action"}></FavoriteIcon>
                        </IconButton>
                        <Typography>Beğen</Typography>
                    </div>
                    <div className='product-action'>
                        <IconButton onClick={isComment ? offComment : onComment}>
                            <CommentIcon></CommentIcon>
                        </IconButton>
                        <Typography>Yorumlar</Typography>
                    </div>
                    <div className='product-action'>
                        <IconButton onClick={addBasket}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                        </IconButton>
                        <Typography>Sepete Ekle</Typography>
                    </div>
                </CardActions>: <></> }
                
        </Card> 
      }
      {
        userIsLogin ? <div>
{isComment ? <div>
        <Card id='comment-send'>
          <Grid  id='grid-comment'>  
            <TextField name='content' onChange={inputChange} sx={{
              width: '70%',
              margin: "3%"
              
            }} label="Yorum Gönder"></TextField>
            <Button disabled={disabled}
              onClick={commentAdd}
              sx={{
  color :"black"
}}
startIcon={<Send></Send>}></Button>
          </Grid>
          <div>{commentList.map((comment, index) => {
            return <CommentListPage comment={comment} key={index}></CommentListPage>
          })}</div>
        </Card>
        
      </div> : <></>}
      </div> : <></>
      }
      
      
    </div>
  )
}
export default ProductDetailPage
