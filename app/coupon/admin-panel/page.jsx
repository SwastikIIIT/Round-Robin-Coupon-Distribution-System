import { auth } from '@/auth'
import AdminPanel from '@/components/AdminPanel'
import React from 'react'

const AdminPage =async() => {
  
  const session=await auth();
  
  if(session)
    return <AdminPanel />  

  return(
     <div className='flex flex-col justify-center items-center min-h-screen'>
         <div className='text-2xl font-bold mb-4'>Access Denied</div>
         <p>You need to be a admin to login in to access admin panel</p>
     </div>
  )
}

export default AdminPage