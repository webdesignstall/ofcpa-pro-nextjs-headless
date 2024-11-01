import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'

export default function ServiceSection({ services }) {

    return (
        <div className="px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pb-12"
            >
                <h1 className="text-center text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-yellow-500 font-bold">
                    - {services?.serviceTitle ? services?.serviceTitle : "Tax and Corporate Services"} -
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto bg-[#2a5b84] text-white p-3 md:p-6 lg:p-8 rounded-xl"
            >
                <div className="grid grid-cols-1 gap-y-4 lg:gap-y-5 xl:gap-y-8 font-semibold text-md lg:text-xl p-4 md:text-lg">
                    {
                        services?.serviceItems?.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 * 0.1 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-x-10 md:gap-x-36 lg:gap-x-48"
                            >
                                <p>{service?.itemTitle}</p>
                                <p className="">{service?.price}</p>
                            </motion.div>
                        ))}
                </div>
            </motion.div>
            <div className='flex justify-center items-center py-6'>
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
    );
}
