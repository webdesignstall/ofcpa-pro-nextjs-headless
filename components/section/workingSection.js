import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';

export default function WorkingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' }); // Adjusts when to start animation

  return (
    <div className='pt-12' ref={sectionRef}>
      <div>
        {/* Animated Header */}
        <motion.h1
          className='text-center text-4xl font-bold text-[#2A5B84] pb-12'
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          WORKING WITH US
        </motion.h1>

        <div className='max-w-6xl m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pb-12'>
            {/* Content Section */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className='flex space-x-6'>
                <div>
                  <Image
                    width={100}
                    height={100}
                    src='/technology.webp'
                    alt='technology'
                  />
                </div>
                <div>
                  <h1 className='text-2xl font-semibold p-2'>
                    Air-tight confidentiality with secure tech and strict agreements
                  </h1>
                  <p>
                    We utilize encrypted technologies and bind all team members to comprehensive NDAs to ensure your sensitive information is always protected.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='m-auto text-center pb-12'>
            <Button text='Book a Call' />
          </div>
        </div>
      </div>
    </div>
  );
}
