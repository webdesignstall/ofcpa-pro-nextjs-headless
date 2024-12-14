import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check } from 'lucide-react';
import {getTaxTips} from "../../lib/query";
import {replaceOgUrl, revalidateIntervalDay} from "@/lib/utils";
import Head from "next/head";
import parse from "html-react-parser";
import Image from "next/image";


export async function getStaticProps() {

    const pageContent = await getTaxTips()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/taxtipsforcreators`)

    const result = await response.json();

    if(result?.head !== undefined){
        // Modify og:url
        result.head = replaceOgUrl(result.head, '/taxtipsforcreators');
    }else {
        result.head = null;
    }


    return {
        props: {seo: result, pageContent: pageContent },
        revalidate: revalidateIntervalDay(30)
    };
}

export default function Taxtipsforcreators({seo, pageContent}) {


    return (

        <>
            <Head>
                {seo?.head && parse(seo?.head)}
            </Head>

            <div className="p-4 sm:p-8">

                {/* Video Section */}
                <div
                    className="bg-gray-700 w-full h-[500px] md:h-[700px] lg:h-[900px] flex justify-center items-center relative">
                    <div
                        className="max-w-screen-xl w-full flex flex-col items-center text-center px-4 sm:px-8 relative">
                        <div className="w-full max-w-[60rem] aspect-video rounded-xl overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src={pageContent?.sectionVideo}
                                title="The OnlyFans Accountant - Financial Solutions for the Modern Creator"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <h1
                        data-aos="fade-up"
                        className="text-gray-200 text-2xl leading-loose md:text-4xl lg:text-[3.4rem] font-bold mt-8 absolute bottom-16 px-4 text-center"
                    >
                        {/*Ready to level up your tax game?*/}
                        {pageContent?.sectionTitle}
                    </h1>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-8 bg-white text-gray-800 flex flex-col items-center">
                    <div className="max-w-7xl lg:flex items-center gap-4">
                        {/* Image Placeholder */}
                        <Image width={560} height={400} className='lg:object-contain lg:ml-16'
                               src={pageContent?.leftColumnImage?.node?.sourceUrl}
                               alt={pageContent?.leftColumnImage?.node?.altText || 'image'}/>
                        {/* Text Content */}
                        {/* <div className='flex-shrink'>
                            {pageContent?.rightColumnWording}
                        </div>*/}

                        <div>
                            {
                                parse(pageContent?.rightColumnWording)
                            }
                        </div>

                        </div>

                        {/* Call-to-Action Button */}
                        <div className="max-w-3xl mt-8">
                            <div className="flex justify-center">
                                <button
                                    className="bg-yellow-500 text-white font-normal py-4 px-8 rounded-md text-2xl sm:text-3xl hover:bg-sky-800 transition">
                                    {pageContent?.buttonLabel}
                                </button>
                            </div>
                            <p className="text-lg sm:text-2xl text-center mt-6">
                                {pageContent?.formInfo}
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="w-full max-w-4xl mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg">
                            <form className="flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name"
                                           className="text-gray-700 text-lg sm:text-xl font-medium mb-2">Name*</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        className="p-3 bg-gray-50  border-gray-300 rounded-md focus:outline-none focus:bg-gray-100 focus:border-yellow-500 transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email"
                                           className="text-gray-700 text-lg sm:text-xl font-medium mb-2">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="p-3 bg-gray-50  border-gray-300 rounded-md focus:outline-none focus:bg-gray-100 focus:border-yellow-500 transition"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-sky-700 text-white font-semibold py-3 rounded-md text-lg hover:bg-yellow-500 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>


            );
            }
