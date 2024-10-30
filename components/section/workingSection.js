import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';

export default function WorkingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' }); // Adjusts when to start animation

  return (
    <div id="what-we-do" className='pt-12' ref={sectionRef}>
      <div>
        {/* Animated Header */}
        <motion.h1
          className='text-center text-4xl font-bold text-[#2A5B84] pb-16'
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          WORKING WITH US
        </motion.h1>

        <div className='max-w-6xl m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pb-12'>
            {/* Content Section */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className='flex flex-col lg:flex-row justify-center lg:justify-normal items-center lg:items-start lg:text-left text-center gap-4 px-6'>
                <div>
                  <Image
                    className='w-12 md:w-24 lg:w-36'
                    width={300}
                    height={300}
                    src='/technology.webp'
                    alt='technology'
                  />
                </div>
                <div>
                  <h1 className='text-xl font-semibold p-2'>
                    Air-tight confidentiality with secure tech and strict agreements
                  </h1>
                  <p className='leading-8'>
                    We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center py-10'>
            <motion.button
              className='rounded-full px-16 py-4 text-xl font-semibold bg-cyan-800 hover:bg-yellow-500 text-white mt-4'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 , transition: { delay: 0.2 , duration: 0.5 }}}
              whileHover={{ scale: 1.15, transition: { delay: 0, duration: 0.3 } }} 
              whileTap={{ scale: 0.95 }}
            >
              Book a Call
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
