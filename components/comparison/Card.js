import React from 'react';
import { sections } from './data';
import { CircleCheckBig } from 'lucide-react';

export default function ComparisonCard({tables}) {
    return (
        <div className="max-w-7xl mx-auto">
            {
                sections.map((section, sectionIndex) => (
                    <div 
                        key={sectionIndex} 
                        className={`grid grid-cols-1 md:grid-cols-3 border gap-6 p-4 my-3 border-r-8  relative 
                        ${sectionIndex % 2 === 0 ? 'bg-white border-yellow-400' : 'bg-gray-100 border-gray-100 border-r-sky-800'}`}
                    >

                        <div className={`absolute left-0 top-6 h-4/5 w-2 md:w-6  rounded-r-3xl ${sectionIndex % 2 === 0 ? 'bg-yellow-400' : ' bg-sky-800'}`}></div>


                        <div className={`flex flex-col gap-y-3 md:gap-y-5 font-semibold text-sky-700 border-r-0 md:border-r-2 border-yellow-400 pl-6 md:pl-8 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-r-sky-800'}`}>
                            {Object.values(section)[0].map((item, index) => (
                                <p key={index}>{item.title}</p>
                            ))}
                        </div>


                        <div className={`flex flex-col gap-y-3 md:gap-y-5 font-normal pr-8 text-sm text-sky-700 border-r-0 md:border-r-2 border-yellow-500 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-r-sky-800'}`}>
                            {Object.values(section)[0].map((item, index) => (
                                <p className="flex gap-3 items-center justify-start" key={index}>
                                    <span><CircleCheckBig size={20} /></span>
                                    <span>{item.onlyFansText}</span>
                                </p>
                            ))}
                        </div>


                        <div className="flex flex-col gap-y-3 md:gap-y-5 font-normal text-sm text-sky-700">
                            {Object.values(section)[0].map((item, index) => (
                                <p key={index}>{item.competitorText}</p>
                            ))}
                        </div>
                    </div>
                ))
            }

           {/* {
                tables?.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className={`grid grid-cols-1 md:grid-cols-3 border gap-6 p-4 my-3 border-r-8  relative 
                        ${sectionIndex % 2 === 0 ? 'bg-white border-yellow-400' : 'bg-gray-100 border-gray-100 border-r-sky-800'}`}
                    >

                        <div className={`absolute left-0 top-6 h-4/5 w-2 md:w-6  rounded-r-3xl ${sectionIndex % 2 === 0 ? 'bg-yellow-400' : ' bg-sky-800'}`}></div>


                        <div className={`flex flex-col gap-y-3 md:gap-y-5 font-semibold text-sky-700 border-r-0 md:border-r-2 border-yellow-400 pl-6 md:pl-8 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-r-sky-800'}`}>
                            {section?.items?.map((item, index) => (
                                <p key={index}>{item?.label}</p>
                            ))}

                        </div>


                        <div className={`flex flex-col gap-y-3 md:gap-y-5 font-normal pr-8 text-sm text-sky-700 border-r-0 md:border-r-2 border-yellow-500 ${sectionIndex % 2 === 0 ? 'border-r-yellow-400': 'border-r-sky-800'}`}>
                            {section?.items?.map((item, index) => (
                                <p className="flex gap-3 items-center justify-start" key={index}>
                                    <span><CircleCheckBig size={20} /></span>
                                    <span>{item?.ourPart}</span>
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-y-3 md:gap-y-5 font-normal text-sm text-sky-700">
                            {section?.items?.map((item, index) => (
                                <p key={index}>{item?.otherPart}</p>
                            ))}
                        </div>
                    </div>
                ))
            }*/}
        </div>
    );
}
