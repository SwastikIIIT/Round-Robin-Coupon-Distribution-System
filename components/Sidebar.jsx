'use client'
import React, { useState } from 'react';
import { ChevronRight, File, Home, LayoutGrid, Menu, UserCog2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar=()=>{
  const [isOpen,setIsOpen]=useState(true);
  const pathname=usePathname();
  
  const toggleSidebar=()=>{
    setIsOpen(!isOpen);
  };
  
  const items=[
    { 
      name:'AdminPanel',
      icon: UserCog2,
      isActive:pathname==='/coupon/admin-panel',
      href:'/coupon/admin-panel'},
    {
       name:'Home',
       icon: Home,
       isActive:pathname==='/coupon',
       href:'/coupon'
      },
      {
        name:'Documentation',
        icon: File,
        isActive:pathname==='/coupon/system-docs',
        href:'/coupon/system-docs'
       },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer fixed bottom-4 right-4 z-50  md:hidden  bg-neutral-800 text-white  hover:bg-neutral-700 rounded-full shadow-lg"
        onClick={toggleSidebar}
        >
        {isOpen?<X size={18}/>:<Menu size={18}/>}
      </Button>
    
      <aside className={`mt-16 fixed inset-y-0 left-0 z-40 w-58  bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 
          transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4  border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
            Navigation Control
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer text-neutral-600 dark:text-neutral-400  hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={toggleSidebar}
          >
            <X size={18}/>
          </Button>
        </div>
        
        
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2 text-sm 
                  rounded-md transition-all duration-200 ease-in-out
                  ${item.isActive? 'bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              >
                <div className="flex items-center">
                  <item.icon 
                    className={`h-5 w-5 mr-3 transition-colors duration-200 
                      ${item.isActive ? 'text-neutral-800 dark:text-neutral-200' :'text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-300'
                      }`} 
                  />
                  {item.name}
                </div>
                <ChevronRight 
                  size={16} 
                  className={`opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 dark:text-neutral-600 ${item.isActive ? 'opacity-100' : ''}`}
                />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="p-4  border-t border-neutral-200 dark:border-neutral-800">
          <div className="px-3 py-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Sidebar Analytics v1.0
            </p>
          </div>
        </div>
      </aside>
      
      
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden "
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;