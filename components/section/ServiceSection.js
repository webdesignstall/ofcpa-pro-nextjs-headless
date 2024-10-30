import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceSection() {
    return (
        <div className="px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pb-12"
            >
                <h1 className="text-center text-5xl text-yellow-500 font-bold">
                    - Tax and Corporate Services -
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto bg-sky-900 text-white p-6 sm:p-10 rounded-xl"
            >
                <div className="grid grid-cols-1 gap-y-6 font-semibold text-lg p-4">
                    {[
                        { service: '1040 with Sch C', price: '$1,500+' },
                        { service: '1040 + 1120S', price: '$2,500+' },
                        { service: '1065 + K-1s', price: '$2,500+' },
                        { service: 'Bookkeeping Catch Up', price: '$2,500+/yr' },
                        { service: '1099 Filings', price: '$250 base + $20 per 1099' },
                        { service: 'LLC Formation and Filings', price: '$495/yr' },
                        { service: 'S Corp Election and Filings', price: '$249/yr' },
                        { service: 'Payroll Setup', price: '$495' },
                        { service: 'Quarterly Estimates', price: '$100/qtr' }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 * 0.1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-x-40"
                        >
                            <p>{item.service}</p>
                            <p className="">{item.price}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className='flex justify-center items-center py-10'>
                <motion.button
                    className='rounded-full px-16 py-4 text-xl font-semibold bg-cyan-800 hover:bg-yellow-500 text-white mt-4'
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                    whileHover={{ scale: 1.15, transition: { delay: 0, duration: 0.3 } }}
                    whileTap={{ scale: 0.95 }}
                >
                    Book a Call
                </motion.button>
            </div>
        </div>
    );
}
