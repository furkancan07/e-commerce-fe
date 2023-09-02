import React, { useEffect } from 'react'
import { getProduct } from '../../api/server'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const ProductDetailPage = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState({});
  const { title, description, admin, image, category, price } = product;
  
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
  useEffect(() => {
    getProductDetail();
  },[])
  return (
    <div>
         {
        product !=null ?   <Card >
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
                        <video height={217} width='100%' controls>
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
                <CardActions id='action'>
                    <div className='product-action'>
                        <IconButton>
                            <FavoriteIcon color='warning'></FavoriteIcon>
                        </IconButton>
                        <Typography>Beğen</Typography>
                    </div>
                    <div className='product-action'>
                        <IconButton>
                            <CommentIcon></CommentIcon>
                        </IconButton>
                        <Typography>Yorumlar</Typography>
                    </div>
                    <div className='product-action'>
                        <IconButton>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                        </IconButton>
                        <Typography>Sepete Ekle</Typography>
                    </div>
                </CardActions>
            </Card> : <></>
      }
    
    
        
    </div>
  )
}

export default ProductDetailPage
