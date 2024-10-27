import React from 'react'
import Button from '../ui/Button'
import Image from 'next/image'

export default function FirstSection() {
    return (
        <div className='pt-6'>
            <div>
                Home The OnlyFans Accountant
            </div>
            <h1 className='text-4xl font-bold pt-4 pb-12'>The OnlyFans Accountant</h1>
            <div className='bg-gray-100 min-h-screen flex p-20'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 flex justify-center items-center'>
                        <div>
                            <h1 className='text-5xl font-bold text-[#2a5b84] pb-4 uppercase flex-wrap'>
                                Financial Solutions and Taxes for Content Creators
                            </h1>
                            <p className='text-[#2a5b84] pb-6 font-normal text-lg'>We free content creators from the burden of managing the financial side of the business, creating a safe space for them to flourish creatively.</p>
                            <div className='m-auto'>
                                <Button text='Book a call' />
                            </div>
                        </div>
                    </div>
                    <div></div>

                </div>
                <div>
                    <Image
                        className=' bg-cover'
                        width={1500}
                        height={1500}
                        src='/shutterstock.jpg'
                        alt='Book a call'
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
