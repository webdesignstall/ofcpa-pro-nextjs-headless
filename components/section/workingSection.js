import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { urlFor } from "../../lib/api";
import Link from 'next/link';

export default function WorkingSection({ workingWithUs }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' }); // Adjusts when to start animation

  return (
    <div id="what-we-do" className='pt-3 md:pt-4 lg:pt-5 xl:pt-6 mt-4' ref={sectionRef}>
      <div>
        {/* Animated Header */}
        <motion.h1
          className='text-center lg:text-4xl text-3xl xl:text-5xl font-bold text-[#2A5B84] p-4'
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          {workingWithUs?.sectionTitle}
        </motion.h1>
        {workingWithUs?.sectionSubtitle && <p>{workingWithUs?.sectionSubtitle}</p>}



        <div className='max-w-7xl m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 pt-4'>
            {/* Content Section */}
            {workingWithUs?.items?.map((item, index) => (
              <div key={index} className='flex flex-col md:flex-col lg:flex-row justify-center lg:justify-normal items-center lg:items-start lg:text-left text-center gap-4 p-6'>
                <div>
                  {
                    item?.image && <Image
                      className='w-16 md:w-24 lg:w-36'
                      width={300}
                      height={300}
                      src={urlFor(item?.image).url()}
                      alt='technology'
                    />
                  }


                </div>
                <div>
                  <h1 className='text-xl font-semibold p-2'>
                    {item?.title}
                  </h1>
                  <p className='leading-8'>
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center pt-6'>
            <Link href='#booking'>
              <motion.button
                className='rounded-full px-8 py-3 text-md font-normal tracking-widest bg-cyan-800 hover:bg-yellow-500 text-white mt-4 lg:py-4 lg:px-12 lg:text-xl'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                whileHover={{ scale: 1.15, transition: { delay: 0, duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK A CALL
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
