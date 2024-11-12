import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check } from 'lucide-react';
import {getHomePageContent} from "../../lib/query";
import {replaceOgUrl, revalidateIntervalDay} from "@/lib/utils";
import Head from "next/head";
import parse from "html-react-parser";
import Image from "next/image";

export async function getStaticProps() {

    // const pageContent = await getHomePageContent()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/taxtipsforcreators`)

    const result = await response.json();

    // Modify og:url
    result.head = replaceOgUrl(result.head, '/taxtipsforcreators');

    return {
        props: {seo: result},
        revalidate: revalidateIntervalDay(30)
    };
}

export default function Taxtipsforcreators({seo}) {
    return (

        <>
            <Head>
                {parse(seo.head)}
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
                                src="https://www.youtube.com/embed/nnV_WQS0e_s?modestbranding=1&rel=0&showinfo=0"
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
                        Ready to level up your tax game?
                    </h1>
                </div>


                {/* Content Section */}
                <div className="p-4 sm:p-8 bg-white text-gray-800 flex flex-col items-center">
                    <div className="max-w-7xl lg:flex items-center gap-4">
                        {/* Image Placeholder */}


                            <Image width={560} height={400} className='lg:object-contain lg:ml-16' src={'https://ofcpa.xyz/wp-content/uploads/2023/10/of-min.jpg'} alt={'image'}/>




                        {/* Text Content */}
                        <div className='flex-shrink'>
                            <p className="text-2xl mb-6">
                                We know you’re passionate about bringing your ideas to life, but the business side of
                                things can sometimes feel overwhelming, especially when it comes to taxes.
                            </p>
                            <p className="text-2xl mb-6">
                                Here’s the good news: you don’t have to navigate confusing deductions and deadlines
                                alone. Our team of dedicated accounting professionals created this free eBook,
                                specifically for content creators like you, to help you:
                            </p>
                            <ul className="text-2lx mb-6 space-y-2">
                                <li className="flex items-start gap-2">
                                    <Check className="text-green-500 mt-1"/>
                                    <p className='text-xl'> Understand key tax deductions and credits relevant to your work. </p>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="text-green-500 mt-1"/>
                                    <p className='text-xl'> Master tax planning strategies to minimize your tax burden. </p>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="text-green-500 mt-1"/>
                                    <p className='text-xl'> Stay organized and avoid tax headaches with actionable tips. </p>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="text-green-500 mt-1"/>
                                    <p className='text-xl'> Learn about common mistakes to avoid and save yourself money. </p>
                                </li>
                            </ul>

                            <p className="text-2xl mb-6">
                                By downloading this free eBook, you’ll gain valuable insights and peace of mind,
                                allowing you to focus on what you do best: creating amazing content!
                            </p>
                        </div>
                    </div>

                    {/* Call-to-Action Button */}
                    <div className="max-w-3xl mt-8">
                        <div className="flex justify-center">
                            <button
                                className="bg-yellow-500 text-white font-normal py-4 px-8 rounded-md text-2xl sm:text-3xl hover:bg-sky-800 transition">
                                GET YOUR FREE EBOOK NOW
                            </button>
                        </div>
                        <p className="text-lg sm:text-2xl text-center mt-6">
                            Fill out the form below to unlock your instant access to the free eBook and start claiming
                            your rightful tax savings.
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
