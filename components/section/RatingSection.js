import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
            feedback: "It’s funny because at first I was debating even getting an accountant. Wasn’t sure I’d be able to afford it but it’s so worth it. I'd mess it up so bad on my own.",
        },
        {
            name: "Jessica A.",
            role: "Content Creator",
            rating: 5,
            feedback: "Matt, you and your team are more than accountants; you're like my financial best friend. I love that I never have to wait for you to answer my questions and you're SO patient.",
        },
        {
            name: "Alex D.",
            role: "Influencer",
            rating: 5,
            feedback: "Hiring Matt was the best financial decision I've made. I now understand my earnings and expenses, and I feel more confident about my financial future.",
        },
        {
            name: "Jamie R.",
            role: "Content Creator",
            rating: 5,
            feedback: "Working with Matt has taken so much stress off my shoulders. I can focus on creating, knowing that my finances are being handled professionally.",
        },
    ];

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pb-12"
            >
                <h1 className="text-center pb-10 text-5xl font-bold text-blue-900">
                    Don't Just Take Our Word For It
                </h1>
            </motion.div>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-2">
                        <div className="bg-yellow-500 text-white border-2 border-white rounded-xl p-6 shadow-lg w-full h-96 flex flex-col justify-between text-left   hover:bg-cyan-800 duration-200">
                            <div>
                                <h2 className="font-semibold text-lg tracking-wide py-4">{testimonial.name}</h2>
                                <p className="text-sm mb-4 tracking-wider py-2">{testimonial.role}</p>
                                <div className="flex mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, idx) => (
                                        <Star key={idx} className="text-white w-5 h-5" />
                                    ))}
                                </div>
                                <p className="text-md tracking-wide leading-8">{testimonial.feedback}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className='flex justify-center items-center py-10'>
                <motion.button
                    className='rounded-full px-16 py-4 text-xl font-semibold bg-cyan-800 hover:bg-yellow-500 text-white mt-4'
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Book a Call
                </motion.button>
            </div>
        </div>
    );
}
