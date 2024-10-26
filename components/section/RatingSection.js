import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
            <div>
                <div>
                    <h1 className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">Don't Just Take Our Word For It</h1>
                </div>
                <div>
                    <Slider {...settings}>
                       <div></div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}