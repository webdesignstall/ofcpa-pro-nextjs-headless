import Image from 'next/image'
import React from 'react'
import Button from '../ui/Button'

export default function WorkingSection() {
  return (
    <div className='pt-12'>
      <div>
        <h1 className='text-center text-4xl font-semibold text-neutral-700 pb-12'>WORKING WITH US</h1>
        <div className='max-w-7xl m-auto'>
          <div className='grid grid-cols-2 gap-8 pb-12'>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
            <div className='flex space-x-6'>
              <div>
                <Image
                  width={100}
                  height={100}
                  src='/technology.webp'
                  alt='technology'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold p-2'>Air-tight confidentiality with secure tech and strict agreements</h1>
                <p>We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.</p>
              </div>
            </div>
          </div>
          <div className='m-auto text-center pb-12'>
            <Button text='Book a Call' />
          </div>
        </div>
      </div>
    </div>
  )
}
