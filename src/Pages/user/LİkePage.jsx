import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../../redux/Reducer/Product/LikeReducer';
import LikeListPage from '../../compenents/LikeListPage';

const LİkePage = () => {
  const  email  = localStorage.getItem("email");
  const dispatch = useDispatch();
  const { likeList } = useSelector((store) => store.like);
  useEffect(() => {
    dispatch(getLikes(email));
  },[])
  return (
    <div>
      {likeList.map((like, index) => {
        return <LikeListPage like={like} key={index}/>
      })}
    </div>
  )
}

export default LİkePage
