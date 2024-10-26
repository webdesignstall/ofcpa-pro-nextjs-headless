import React from 'react'
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div>


      <div class="grid grid-cols-3 gap-4 bg-sky-700">
        <div></div>
        <div className='flex justify-center items-center  text-white py-16 px-12'>
          <ul>
            <li className='grid grid-cols-2 gap-1'>
              <div><Mail /></div>
              <div>
                <span className='block'>Main</span>
                <span className='block'>abc@mail.com</span>
              </div>
            </li>
          </ul>
          {/* <div>
            <Image
              width={200}
              height={200}
              src='/logo/bg_footer_logo.jpg'
              alt='Footer logo'
            />
          </div> */}
        </div>
        <div></div>
      </div>
      <div className='bg-gray-800  p-6 text-center'>
        <p className='text-white text-sm'><span className='text-gray-400'>Copyright © 2024</span> <Link className='underline hover:text-yellow-500 duration-200' href='#'>The OnlyFans Accountant</Link></p>
      </div>
    </div>
  )
}
