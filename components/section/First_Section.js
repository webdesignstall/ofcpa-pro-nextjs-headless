import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FirstSection() {
    return (
        <section className='pt-6 px-4'>
            <div className='text-center lg:text-left'>
                <h2 className='text-sm text-gray-600'>Home &gt; The OnlyFans Accountant</h2>
                <h1 className='text-3xl lg:text-4xl font-bold pt-4 pb-6 lg:pb-12'>The OnlyFans Accountant</h1>
            </div>

            <div className='bg-gray-100 min-h-screen flex flex-col lg:flex-row items-center p-4 lg:p-20'>
                {/* Text and Call-to-Action Section */}
                <div className='flex-1 flex justify-center items-center mb-10 lg:mb-0'>
                    <div className='max-w-lg text-center lg:text-left'>
                        <motion.h1
                            className='text-3xl lg:text-5xl font-bold text-[#2a5b84] pb-4 uppercase leading-snug'
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Financial Solutions and Taxes for Content Creators
                        </motion.h1>

                        <motion.p
                            className='text-[#2a5b84] pb-6 font-normal text-lg'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            We free content creators from the burden of managing the financial side of the business, creating a safe space for them to flourish creatively.
                        </motion.p>

                        {/* Animated Button */}
                        <div className='flex justify-center lg:justify-start'>
                            <motion.button
                                className='rounded-full px-8 py-3 bg-yellow-500 text-white font-semibold mt-4'
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book a Call
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center lg:justify-end'>
                    <Image
                        className='rounded-lg bg-cover w-full h-auto max-w-md lg:max-w-full'
                        width={1500}
                        height={1500}
                        src='/shutterstock.jpg'
                        alt='Book a call'
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
