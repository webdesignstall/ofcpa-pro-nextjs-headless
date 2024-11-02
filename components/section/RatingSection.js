import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Link from "next/link";


export default function SimpleSlider({ reviews }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="py-10 max-w-7xl mx-auto px-3 pt-3 md:pt-4 lg:pt-5 xl:pt-6 mt-4">
            <h1 data-aos="fade-up" className="text-center lg:text-4xl text-3xl xl:text-5xl font-bold text-[#2A5B84] p-4">
                Don't Just Take Our Word For It
            </h1>

            <Slider {...settings}>
                {reviews?.map((review, index) => (
                    <div key={review?._id || index} className="p-2">
                        <div
                            className="bg-[#E9BC29] text-white border-2 border-white rounded-xl p-8 shadow-lg w-full h-[27rem] sm:h-[20rem]  lg:h-[27rem] overflow-hidden md:h-[25rem] pb-16 flex flex-col justify-between text-left   hover:bg-cyan-800 duration-200">
                            <div>
                                <h2 className="font-semibold text-lg tracking-wide py-4">{review?.reviewerName}</h2>
                                <p className="text-sm mb-4 tracking-wider py-2">{review?.reviewerTitle}</p>
                                <Rating className="text-white" style={{maxWidth: 100}} value={review?.rating}
                                        readOnly={true} halfFillMode/>
                                <p className="text-md tracking-wide leading-9">{review?.reviewText}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="pt-8 italic text-sm text-center text-sky-900">
                *names have been changed in order to maintain client confidentiality.
            </div>
            <div className='flex justify-center items-center pt-6'>
                <Link data-aos="fade-up" className='rounded-full px-8 py-3 text-md font-normal tracking-widest bg-cyan-800 hover:bg-yellow-500 text-white mt-4 lg:py-4 lg:px-12 lg:text-xl' href='#booking'>
                    BOOK A CALL
                </Link>
            </div>
        </div>
    );
}
