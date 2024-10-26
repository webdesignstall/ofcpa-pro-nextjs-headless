import React from 'react'
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div class="grid grid-cols-3 gap-4 bg-sky-700">
      <div></div>
      <div className='flex justify-center items-center  text-white py-16 px-12'>
        <ul>
          <li className='grid grid-cols-2'>
            <span>Call</span>
            <div className='flex flex-col'>
              <span>Email</span>
              <span>abc@gmail.com</span>
            </div>
          </li>
          <li className='grid grid-cols-2'>
            <span>Call</span>
            <div className='flex flex-col'>
              <span>Email</span>
              <span>abc@gmail.com</span>
            </div>
          </li>
        </ul>
        <div>
          <Image
            width={200}
            height={200}
            src='/logo/bg_footer_logo.jpg'
            alt='Footer logo'
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}
