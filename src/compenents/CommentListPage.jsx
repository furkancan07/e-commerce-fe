import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { deleteToComment } from '../redux/Reducer/Product/CommentReducer';

const CommentListPage = ({ comment }) => {
  const { id, content, user } = comment
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const delComment=() => {
    dispatch(deleteToComment(id));
     setTimeout(() => {
       window.location.reload();
       alert("Yorum Silindi");   // Reload the page
  }, 500);
  }

    
  return (
    <div>
      <Card
      
      sx={{
        flexDirection: 'row',
        display: 'flow-root',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 10,
        maxWidth: 1000,
        bgcolor: grey[300], 
      }}
      >
        {
          email===user.email ?
 <div className='deleteDiv'>
          <Button onClick={delComment} startIcon={<ClearIcon sx={{
   color : "black"
 }}></ClearIcon>}></Button>
        </div> : <></>
        }
       
       
      <CardHeader
        avatar={<Avatar src={user.image} sx={{ bgcolor: grey[800] }}>{user.username.charAt(0)}</Avatar>}
        title={user.username}
      />
      <CardContent>
        <Typography variant='h6'>{content}</Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default CommentListPage
