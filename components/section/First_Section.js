import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {urlFor} from "../../lib/api";
import Link from 'next/link';


export default function FirstSection({ heroSection }) {

    return (
        <section id="home">
            <div className='lg:text-left'>
                <h2 className='text-sm text-gray-600'>Home &gt; The OnlyFans Accountant</h2>
                <h1 className='text-3xl lg:text-4xl  font-bold pt-2 pb-8 lg:pb-12 leading-normal md:text-4xl '>{heroSection?.sectionTitle}</h1>
                {heroSection?.sectionSubtitle &&
                    <p className='text-3xl lg:text-4xl  font-bold pt-2 pb-8 lg:pb-12 leading-normal md:text-4xl xl:text-5xl'>{heroSection?.sectionSubtitle}</p>}
            </div>

            <div
                className='bg-gray-100 lg:min-h-screen flex flex-col lg:flex-row items-center lg:px-12 lg:py-16 xl:py-20 xl:px-24 py-20 px-6'>
                {/* Text and Call-to-Action Section */}
                <div className='flex-1 flex justify-start items-center mb-10 lg:mb-0'>
                    <div className='md:max-w-2xl lg:max-w-[23rem] xl:max-w-[35rem] text-center lg:text-left lg:pr-12'>
                        <motion.h1
                            className='text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-bold text-[#2a5b84] pb-4 uppercase leading-8 md:leading-10 xl:leading-[3.5rem] lg:leading-9'
                            initial={{ opacity: 0, y: 250 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: .3 }}
                        >
                            {heroSection?.title}
                        </motion.h1>

                        <motion.p
                            className='text-[#2a5b84] pb-2 font-normal text-xl'
                            initial={{ opacity: 0, y: 200 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {heroSection?.description}
                        </motion.p>

                        {/* Animated Button */}
                        <div className='flex justify-center lg:justify-start'>
                            <motion.button
                                className='rounded-full px-12 py-4 bg-yellow-500 text-sky-900 hover:text-white font-normal mt-4 xl:mt-2 xl:px-12 xl:py-4 hover:bg-sky-900 lg:text-lg text-sm'
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
                                whileHover={{ scale: 1.15, transition: { delay: 0, duration: 0.3 } }}  // Ensures no delay on hover

                            >
                                BOOK A CALL
                            </motion.button>
                        </div>

                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center lg:justify-end'>
                    <Image
                        className=' bg-cover w-full h-auto max-w-full lg:max-w-full '
                        width={1200}
                        height={1400}
                        src={urlFor(heroSection?.image).url()}
                        alt='Book a call'
                        priority
                    />
                    {/* <img
                        className=' bg-cover w-full h-auto max-w-full lg:max-w-full '
                        width={1200}
                        height={1400}
                        src={urlFor(heroSection?.image).url()}
                        alt='Book a call'
                    />*/}
                </div>
            </div>
        </section>
    );
}

