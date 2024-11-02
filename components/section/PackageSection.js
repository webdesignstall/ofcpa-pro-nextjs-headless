import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PackageSection({ packages }) {
    return (
        <div id="packages"  className="lg:py-12 py-8 bg-white">
            <h1 data-aos="fade-up" className="text-center scroll-m-20 text-yellow-500 text-4xl font-bold pb-8 tracking-tight lg:text-5xl">
                - Packages -
            </h1>

            {/* Package Cards */}
            <div className="max-w-7xl mx-auto sm:px-6 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {packages?.map((pkg, index) => (

                        <>

                            <div
                            data-aos="fade-up"
                            key={pkg?._id || index}
                            className="bg-[#2a5b84] text-white  p-6 sm:p-8 rounded-2xl shadow-lg"
                        >
                            <div
                            >
                                <h1 data-aos="fade-up" className="text-2xl font-bold py-4 text-center text-yellow-400">
                                    {pkg?.planName}
                                </h1>
                            </div>
                            <div
                            >
                                <p data-aos="fade-up" className="text-3xl font-bold text-center py-3 pb-8">${pkg?.price}</p>
                            </div>
                            <p className="font-semibold flex text-md justify-center items-center  text-center pb-4 leading-relaxed font-sans">
                                {pkg?.description}
                            </p>
                            <ul className="pt-4">
                                {pkg?.features?.map((feature, idx) => (
                                    <li key={idx} className="flex gap-3 py-2 items-center">
                                        <span>
                                            <ShieldCheck className="mt-1 text-white"/>
                                        </span>
                                        <span className='font-bold mr-6'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        </>

                    ))}
                </div>
            </div>
        </div>
    );
}
