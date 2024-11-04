import React from 'react';
import Link from 'next/link'

export default function ServiceSection({ services }) {

    return (
        <div className="px-4 py-12">
            <div
                data-aos="fade-up"
                className="pb-12"
            >
                <h1 className="text-center text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-yellow-500 font-bold">
                    {services?.sectionTitle}
                </h1>
            </div>
            <div
                data-aos="fade-up"
               className="max-w-3xl mx-auto bg-[#2a5b84] text-white p-3 md:p-6 lg:p-8 rounded-xl"
            >
                <div className="grid grid-cols-1 gap-y-4 lg:gap-y-5 xl:gap-y-8 font-semibold text-md lg:text-xl p-4 md:text-lg">
                    {
                        services?.items?.map((service, index) => (
                            <div
                                data-aos="fade-up"
                                key={service?._id || index}
                                className="grid grid-cols-2 gap-x-10 md:gap-x-36 lg:gap-x-48"
                            >
                                <p>{service?.itemTitle}</p>
                                <p className="">{service?.price}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className='flex justify-center items-center py-6'>
                <Link href='#booking'>
                    <button
                        data-aos="fade-up"
                        className='rounded-full px-8 py-3 text-md font-normal tracking-widest bg-cyan-800 hover:bg-yellow-500 text-white mt-4 lg:py-4 lg:px-12 lg:text-xl'
                    >
                        BOOK A CALL
                    </button>
                </Link>
            </div>
        </div>
    );
}
