import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, SquareCheckBig } from 'lucide-react';

export default function PackageSection({ packages }) {
    // Ref to track when the section comes into view
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });


    return (
        <div id="packages" ref={sectionRef} className="py-8 bg-white">
            {/* Animated Heading */}
            <motion.div
                className="text-center pb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="scroll-m-20 text-yellow-500 text-4xl font-bold pb-10 tracking-tight lg:text-5xl">
                    - Packages -
                </h1>
            </motion.div>

            {/* Package Cards */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {packages?.map((pkg, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#2a5b84] text-white p-8 rounded-2xl shadow-lg"
                            initial={{ opacity: 0, y: 300 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-2xl font-bold py-4 text-center text-yellow-400">
                                    {pkg?.planName}
                                </h1>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            >
                                <p className="text-3xl font-bold text-center py-3 pb-8">${pkg?.price}</p>
                            </motion.div>
                            <p className="font-semibold flex text-md justify-center items-center  text-center pb-4 leading-relaxed font-sans">
                                {pkg?.description}
                            </p>
                            <ul className="pt-4">
                                {pkg?.features?.map((feature, idx) => (
                                    <li key={idx} className="flex gap-3 py-2 items-center">
                                        <span>
                                            <ShieldCheck className="mt-1 text-white" />
                                        </span>
                                        <span className='font-bold mr-6'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
