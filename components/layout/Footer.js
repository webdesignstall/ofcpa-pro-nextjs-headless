import React from 'react'
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div>


      <div className="grid grid-cols-3 gap-4 bg-sky-700">
        <div></div>
        <div className='flex justify-around items-center'>
          <ul className='text-white h-96 pt-44 space-y-4'>
            <li className='flex space-x-6'>
              <div className='rounded-full p-3 hover:border-yellow-500 border border-sky-700 duration-200'>
                <Mail size={20} />
              </div>
              <div className='flex flex-col'>
                <span className='text-md font-medium'>Email</span>
                <span className='text-md font-medium'>abc@gmail.com</span>
              </div>
            </li>
            <li className='flex space-x-6'>
              <div className='rounded-full p-3 hover:border-yellow-500 border border-sky-700 duration-200'>
                <Phone size={20} />
              </div>
              <div className='flex flex-col'>
                <span className='text-md font-medium'>Phone</span>
                <span className='text-md font-medium'>+8525412556</span>
              </div>
            </li>
          </ul>
          <div className='pt-24'>
            <Image
            width={200}
            height={200}
            src='/footer_section_logo.webp'
            alt='footer logo'
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className='bg-gray-800  p-6 text-center'>
        <p className='text-white text-sm'><span className='text-gray-400'>Copyright © 2024</span> <Link className='underline hover:text-yellow-500 duration-200' href='#'>The OnlyFans Accountant</Link></p>
      </div>
    </div>
  )
}
