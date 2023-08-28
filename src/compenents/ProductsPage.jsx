import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Button} from '@mui/material'
import { useBeforeUnload, useNavigate } from 'react-router-dom';

const ProductsPage = ({ product }) => {
    const { id, admin, title, image, description, price } = product;
  const navigate = useNavigate();

    
    const trimmedDescription = description.length > 35 ? `${description.slice(0, 33)}...` : description;




  const sendDetailPage = () => {
     navigate(`/product/${id}`)
}
    return (
      <div id='products'>
        <Button onClick={sendDetailPage}>
 <Card id='product-card'>
                <CardHeader
                    avatar={<Avatar>{admin.username.charAt(0)}</Avatar>}
                    title={admin.username}
                />

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
                <CardContent>
                    <Typography variant='h5'>{title}</Typography>
                    <br />
                    <Typography variant='h6'>
                        {trimmedDescription}
                    </Typography>
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
            </Card>
        </Button>
           
        </div>
    )
}

export default ProductsPage;