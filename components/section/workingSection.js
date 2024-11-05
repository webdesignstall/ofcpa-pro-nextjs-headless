import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import parse from "html-react-parser";

export default function WorkingSection({ workingWithUs }) {

  return (
    <div id="what-we-do" className='pt-3 md:pt-4 lg:pt-5 xl:pt-6 mt-4'>
        <h1 data-aos="fade-up" className='text-center lg:text-4xl text-3xl xl:text-5xl font-bold text-[#2A5B84] p-4 '>{workingWithUs?.sectionTitle}</h1>

        <div className='max-w-7xl m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 pt-4'>
            {/* Content Section */}
            {workingWithUs?.items?.map((item, index) => (
              <div key={index} className='flex flex-col md:flex-col lg:flex-row justify-center lg:justify-normal items-center lg:items-start lg:text-left text-center gap-4 p-6'>
                <div>
                  {
                    item?.icon && <Image
                      priority
                      className='w-16 md:w-24 lg:w-36'
                      width={300}
                      height={300}
                      src={item?.icon?.node?.sourceUrl}
                      alt='technology'
                    />
                  }


                </div>
                <div>
                  <h1 className='text-xl font-semibold p-2'>
                    {item?.title}
                  </h1>
                  <p className='leading-8'>
                    {parse(item?.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center pt-6'>
            <Link data-aos="fade-up" className='rounded-full px-8 py-3 text-md font-normal tracking-widest bg-cyan-800 hover:bg-yellow-500 text-white mt-4 lg:py-4 lg:px-12 lg:text-xl' href='#booking'>
                 BOOK A CALL
            </Link>
          </div>
        </div>
    </div>
  );
}
