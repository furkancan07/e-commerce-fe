import React from 'react'
import { useSelector } from 'react-redux'

const AdminPanel = () => {
  const {isLogin}=useSelector((store)=>store.admin)
  return (
    <div>
      {
        isLogin ? <h1>Admin Paneli</h1>
          : <>Bu Sayfayı Görüntüleme Yetkiniz Yok</>
}
    </div>
  )
}

export default AdminPanel
