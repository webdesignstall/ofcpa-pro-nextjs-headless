import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {urlFor} from "../../lib/api";



export default  function FirstSection({heroSection}) {

    return (
        <section id="home" className='pt-10 px-4'>
            <div className='lg:text-left'>
                <h2 className='text-sm text-gray-600'>Home &gt; The OnlyFans Accountant</h2>
                <h1 className='text-4xl lg:text-4xl  font-bold pt-4 pb-14 lg:pb-12 leading-snug'>{heroSection?.sectionTitle}</h1>
                {heroSection?.sectionSubtitle &&
                    <p className='font-bold pt-4 pb-14 lg:pb-12 leading-snug'>{heroSection?.sectionSubtitle}</p>}
            </div>

            <div
                className='bg-gray-100 lg:min-h-screen flex flex-col lg:flex-row items-center lg:px-12 lg:py-16 py-12 p-4'>
                {/* Text and Call-to-Action Section */}
                <div className='flex-1 flex justify-start items-center mb-10 lg:mb-0'>
                    <div className='sm:max-w-lg lg:max-w-md text-center lg:text-left lg:pr-12'>
                        <motion.h1
                            className='text-3xl lg:text-4xl  font-bold text-[#2a5b84] pb-4 uppercase leading-9'
                            initial={{ opacity: 0, y: 250 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: .3 }}
                        >
                            {heroSection?.title}
                        </motion.h1>

                        <motion.p
                            className='text-[#2a5b84] pb-2 font-normal text-lg'
                            initial={{ opacity: 0, y: 200 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {heroSection?.description}
                        </motion.p>

                        {/* Animated Button */}
                        <div className='flex justify-center lg:justify-start'>
                            <motion.button
                                className='rounded-full px-14 py-4 bg-yellow-500 text-white font-normal mt-4 hover:bg-sky-900'
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 , transition: { delay: 0.5 , duration: 0.5 }}}
                                whileHover={{ scale: 1.15, transition: { delay: 0, duration: 0.3 } }}  // Ensures no delay on hover

                            >
                                Book a Call
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

