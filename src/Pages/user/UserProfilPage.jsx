import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserProfilPage = () => {
    const { userIsLogin } = useSelector((store) => store.user);
  return (
      <div>
          {
              userIsLogin ? <div> user profil</div> : <Link to="/login">Bu Sayfaya Erişme Yetkiniz Yok</Link>
          }
     
    </div>
  )
}

export default UserProfilPage
