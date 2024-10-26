import React from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'
import { Search } from 'lucide-react';

function Header() {
  return (
    <div>
      <div className='border w-full'>
        <div className='flex justify-between items-center p-6'>
          <div>
            <Image
              width={250}
              height={250}
              className='bg-cover'
              src='/logo/mainlogo.jpg'
              alt='Main logo'
              priority
            />
          </div>
          <div className='md:hidden'>
            <Sidebar />
          </div>
          <div className='hidden md:flex'>
            <div className='flex'>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'>Home</div>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'>What We Do</div>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'>Testimonials</div>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'>Packages</div>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'>Blog and Articles</div>
              <div className='text-md text-[#005978] p-3 hover:text-yellow-400 duration-200 cursor-pointer'><Search size={20}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header