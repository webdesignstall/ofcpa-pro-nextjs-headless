import React from 'react';
import Image from 'next/image';
import { urlFor } from "../../lib/api";
import Link from 'next/link';
import { Poppins } from 'next/font/google'
import parse from "html-react-parser";

// Define the font at the top level of the module
const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function FirstSection({ heroSection }) {

    return (
        <section id="home">
            {/*<div className='lg:text-left'>
                <h2 className='text-sm text-gray-600'>Home &gt; {heroSection?.slogan}</h2>
                <h1 className={`text-3xl lg:text-4xl font-bold pt-2 pb-8 lg:pb-12 leading-normal md:text-4xl `}>{heroSection?.slogan}</h1>

            </div>*/}

            <div
                className='bg-gray-100 lg:min-h-screen flex flex-col lg:flex-row items-center lg:px-12 lg:py-16 xl:py-20 xl:px-24 py-20 px-6'>
                {/* Text and Call-to-Action Section */}
                <div className='flex-1 flex justify-start items-center mb-10 lg:mb-0'>
                    <div className='md:max-w-2xl lg:max-w-[23rem] xl:max-w-[35rem] text-center lg:text-left lg:pr-12'>
                        <h1 data-aos="fade-up" className='text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-bold text-[#2a5b84] pb-4 uppercase leading-8 md:leading-10 xl:leading-[3.5rem] lg:leading-9'>{heroSection?.sectionTitle}</h1>

                        <p data-aos="fade-up" className='text-[#2a5b84] pb-2 font-normal text-xl'>{parse(heroSection?.description)}</p>


                        {/* Animated Button */}
                        <div className='flex justify-center lg:justify-start'>
                            <Link href='#booking'>
                                <p data-aos="fade-up" className='rounded-full px-12 py-4 bg-yellow-500 text-sky-900 hover:text-white font-normal mt-4 xl:mt-2 xl:px-12 xl:py-4 hover:bg-sky-900 lg:text-lg text-sm'>BOOK A CALL</p>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center lg:justify-end'>
                    <Image
                        src={heroSection?.image?.node?.sourceUrl}
                        alt={heroSection?.image?.node?.altText || "Image"}
                        width={955} // specify the largest image width or your desired default
                        height={1024} // specify the largest image height or your desired default
                        srcSet={heroSection?.image?.node?.srcSet} // Note: srcSet is automatically handled by Next.js
                        sizes="(max-width: 768px) 768px, (max-width: 1200px) 955px, 1333px"
                    />
                </div>
            </div>
        </section>
    );
}

