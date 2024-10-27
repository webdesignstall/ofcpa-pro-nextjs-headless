import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star } from "lucide-react";

export default function SimpleSlider() {
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

    const testimonials = [
        {
            name: "Taylor B.",
            role: "Content Creator",
            rating: 5,
            feedback: "MATT!!! THANK YOU. When you reached out for a testimonial I realized that I haven't even thought about my finances in months because I know you're paying attention.",
        },
        {
            name: "Chris B.",
            role: "Content Creator",
            rating: 5,
            feedback: "It’s funny because at first I was debating even getting an accountant. Wasn’t sure I’d be able to afford it but it’s so worth it. I'd mess it up so bad on my own. I'd rather have you from the start than to implement you down the road.",
        },
        {
            name: "Jessica A.",
            role: "Content Creator",
            rating: 5,
            feedback: "Matt, you and your team are more than accountants; you're like my financial best friend. I love that I never have to wait for you to answer my questions and you're SO patient.",
        },
    ];

    return (
        <div className="py-10 px-4 bg-white">
            <h1 className="text-center pb-8 text-3xl font-semibold text-blue-900">
                Don't Just Take Our Word For It
            </h1>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4">
                        <div className="bg-yellow-400 rounded-lg p-6 shadow-lg text-center">
                            <h2 className="font-semibold text-lg">{testimonial.name}</h2>
                            <p className="text-sm">{testimonial.role}</p>
                            <div className="flex justify-center my-2">
                                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                                    <Star key={idx} className="text-yellow-600" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-800">
                                {testimonial.feedback}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
            <p className="text-center text-sm text-gray-500 mt-4">
                *Names have been changed in order to maintain client confidentiality.
            </p>
        </div>
    );
}
