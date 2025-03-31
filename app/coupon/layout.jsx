import { auth } from '@/auth'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const CouponLayout=async({children})=>{
  const session=await auth();
  return (
      <div className='flex min-h-screen'>
       <Sidebar/>
        <div className='flex-1 flex flex-col'>
              <Navbar session={session}/>
              <main className='flex-1 mt-16 md:ml-64'>
              {children}
              </main>
        <Footer/>
        </div>
      </div>
  )
}

export default CouponLayout