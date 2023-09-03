
import React from 'react'
import Login from '../auth/user/Login';



const UserProfilPage = () => {
    const userIsLogin = localStorage.getItem("userIsLogin");
    console.log(userIsLogin);
  return (
      <div>
          {
              userIsLogin=="true" ? <div> user profil</div> :<Login></Login>
          }
     
    </div>
  )
}

export default UserProfilPage
