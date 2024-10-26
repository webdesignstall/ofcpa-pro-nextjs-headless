import React from 'react'
import Button from '../ui/Button'
import Image from 'next/image'

export default function FirstSection() {
    return (
        <div>
            <h1 className='text-4xl font-semibold pt-4 pb-12'>The OnlyFans Accountant</h1>
            <div className='bg-gray-100 min-h-screen flex flex-row justify-center items-center p-20'>
                <div className='pr-80'>
                    <h1 className='text-4xl font-bold text-gray-700 pb-4 uppercase flex-wrap'>
                        Financial Solutions and Taxes for Content Creators
                    </h1>
                    <p className='text-gray-700 pb-6'>We free content creators from the burden of managing the financial side of the business, creating a safe space for them to flourish creatively.</p>
                    <div className='m-auto'>
                        <Button text='Book a call' />
                    </div>
                </div>
                <div>
                    <Image
                        className=' bg-cover'
                        width={1220}
                        height={1220}
                        src='/shutterstock.jpg'
                        alt='Book a call'
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
