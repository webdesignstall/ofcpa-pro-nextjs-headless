import React from 'react';
import { sections } from './data';
import { CircleCheckBig } from 'lucide-react';

export default function ComparisonCard({tables}) {
    return (
        <div className="max-w-7xl mx-auto">

            {
                tables?.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className={`grid grid-cols-1 md:grid-cols-3  border md:border-l-0 p-0 md:p-4 md:gap-6 my-3 md:border-r-8  relative 
                        ${sectionIndex % 2 === 0 ? 'bg-white border-yellow-400' : 'bg-gray-100 border-sky-800 md:border-r-sky-800'}`}
                    >

                        <div className={`hidden md:block absolute left-0 top-6 h-4/5 w-3 md:w-8 custom-clip rounded-r-full ${sectionIndex % 2 === 0 ? 'bg-yellow-400' : ' bg-sky-800'}`}></div>


                        <div className={`flex flex-col justify-center gap-y-3 p-4 md:gap-y-5 font-bold text-sky-700 border-b md:border-b-0 border-r-0 md:border-r-2 border-yellow-400 pl-6 md:pl-8 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-b-sky-800 border-r-sky-800'}`}>
                            {section?.items?.map((item, index) => (
                                <p key={index}>{item?.label}</p>
                            ))}

                        </div>


                        <div className={`flex flex-col gap-y-3 md:gap-y-5 p-4 font-normal pr-8 text-[14px] text-sky-700 border-b md:border-b-0 border-r-0 md:border-r-2 bg-yellow-400 md:bg-transparent border-yellow-500 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-b-sky-800 border-r-sky-800'}`}>
                            {section?.items?.map((item, index) => (
                                <p className="flex gap-3 items-center justify-start" key={index}>
                                    <span><CircleCheckBig className='text-green-500' size={20} /></span>
                                    <span>{item?.ourPart}</span>
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-y-3 md:gap-y-5 p-4 font-normal text-[14px] text-white md:text-sky-700 bg-sky-800 md:bg-transparent">
                            {section?.items?.map((item, index) => (
                                <p key={index}>{item?.otherPart}</p>
                            ))}
                        </div>
                    </div>
                ))
            }

        </div>
    );
}
