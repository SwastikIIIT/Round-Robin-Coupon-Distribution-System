'use client'
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { handleSignout } from '@/helper/handleSignout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Navbar=({session})=>{
  
    const router=useRouter();
    console.log(session);

    const [isScrolled,setIsScrolled]=useState();
    
    const handleAdminSignout=async()=>{
      const toastID=toast.loading("Logging out...");
        try
        {
            await handleSignout();
            toast.success("User Logged out successfully",{id:toastID});
            setTimeout(()=>{
            toast.dismiss(toastID);
            },1000)
            router.push('/coupon');
        }
        catch(err)
        {
           console.log("Error in signout:",err);
        }
    }

    useEffect(() => {
        const handleScroll=()=>{
          setIsScrolled(window.scrollY>10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      },[]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-neutral-200 dark:border-neutral-800
        ${isScrolled?'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm':'bg-gray-100 dark:bg-neutral-900/80 backdrop-blur-sm'}`}
    >
        <div className="w-full px-4 md:px-6 flex items-center justify-between h-16">
        
          <Link href='/'>
            <div className="flex items-center space-x-3">
                 <Image 
                    src="/coupon.jpg"  
                    alt="Website Logo" 
                    width={40} 
                    height={40} 
                    className="rounded-full shadow-sm transition-transform hover:scale-105"
                    />
                  <span className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                     Coupon Distribution System
                    </span>
            </div>
          </Link>
        
        
        <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
             {!session ?(
                <Link 
                    href="/login"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    >
                    Login
                </Link>
             ):(
              <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-300 font-semibold
                                shadow-sm hover:shadow-md transition-all ">
                                {session?.user ?session?.user.name.charAt(0).toUpperCase():<User/>}
                                </div>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent 
                        align="end" 
                        className="w-64 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-lg rounded-lg
                            divide-y divide-neutral-200 dark:divide-neutral-800"
                        >
                        <div className="flex items-center space-x-3 px-4 py-3 ">
                            <div>
                            <p className="text-sm font-medium truncate hover:text-neutral-600 transition-colors">
                                {session?.user.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                                {session?.user.email}
                            </p>
                            </div>
                        </div>

                        <div className="py-1">
                        <DropdownMenuItem 
                            className="cursor-pointer flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                            onClick={handleAdminSignout}
                            >
                            <LogOut size={16} className="mr-3 group-hover:text-red-700 transition-colors" />
                            <span className="group-hover:text-red-700 transition-colors">
                                Log out
                            </span>
                        </DropdownMenuItem>
                
                      </div>
                    </DropdownMenuContent>
                </DropdownMenu>
             )}
            </div>
        </div>
    </div>
</header>
  )
}

export default Navbar